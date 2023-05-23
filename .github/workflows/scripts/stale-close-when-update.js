
const CONSTENT_VALUES = require('./constant');
/*
Invoked from staleCSAT.js and CSAT.yaml file to 
post survey link in closed issue.
*/
module.exports = async ({ github, context }) => {
    let base_url = '';

    let issues = await github.rest.issues.listForRepo({
        owner: context.repo.owner,
        repo: context.repo.repo,
        state: "open",
        labels: "stale"
    });
    if (issues.status != 200)
        return

    let issueList = issues.data
    for (let i = 0; i < issueList.length; i++) {
        let number = issueList[i].number;
        let resp = await github.rest.issues.listEventsForTimeline({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: number,
        });

        let events = resp.data;
        let closeIssue = false
        for (let i = 0; i < events.length; i++) {
            let event_details = events[i];      
            if (event_details.event == 'labeled' && event_details.label && event_details.label.name == "stale") {  
                let currentDate = new Date();
                let labeledDate = new Date(event_details.created_at)
                let timeInDays = (currentDate - labeledDate) / 86400000
                console.log(`Issue ${number} stale label is ${timeInDays} days old.`)
                let closeAfterStale = 0
                if (timeInDays > closeAfterStale)
                    closeIssue = true
            }
            if (event_details.event == 'unlabeled' && event_details.label && event_details.label.name == "stale")
                    closeIssue = false

        }
        if(closeIssue){
            console.log(`Closing the issue ${number} more then 7 days old with stale label`)
            await github.rest.issues.update({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: number,
                state:"closed"
              });
              await github.rest.issues.createComment({
                issue_number: number,
                owner: context.repo.owner,
                repo: context.repo.repo,
                body: "This issue was closed because it has been inactive for 7 days since being marked as stale. Please reopen if you'd like to work on this further."
            });
        }
    }

}

