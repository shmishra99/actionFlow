// const CONSTENT_VALUES = require('./constant')

/* 
Change the issues label from p0 to p1 if
label adding days go beyond 60 days.
*/
module.exports = async ({ github, context }) => {
    // console.log('entered unmark for issueid = ', context.payload.issue.number);
    // console.log('issue author is ', context.payload.issue.user.login);
    // console.log('issue latest commenter is ', context.payload.sender.login);


    let issues = await github.rest.issues.listForRepo({
        owner: context.repo.owner,
        repo: context.repo.repo,
        state: "open",
        labels: "p0"
    });

    if (issues.status != 200)
        return

   let issueList = issues.data
    console.log("issue list")
    for (let i = 0; i < issueList.length; i++) {

        let number = issueList[i].number;
  
        let resp = await github.rest.issues.listEventsForTimeline({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: number,
        });

        let events = resp.data;
        console.log("event")
        for (let i = 0; i < events.length; i++) {
            let event_details = events[i];
            console.log("event_details",event_details)
        
            if (event_details.event == 'labeled' && event_details.label && event_details.label.name == "p0") {
                let currentDate = new Date();
                let labeledDate = new Date(event_details.created_at)
                console.log("time diff",currentDate - labeledDate)
                if (currentDate - labeledDate > 2) {
                    await github.rest.issues.removeLabel({
                        issue_number: number,
                        owner: context.repo.owner,
                        repo: context.repo.repo,
                        name: "p0"

                    })
                    await github.rest.issues.addLabels({
                        issue_number: number,
                        owner: context.repo.owner,
                        repo: context.repo.repo,
                        labels:["p1"]

                    })
                }

            }
        }
    }
}
