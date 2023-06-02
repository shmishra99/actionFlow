// const CONSTENT_VALUES = require('./constant')

/* 
Change the issues label from p0 to p1 if
label adding days go beyond 60 days.
*/
module.exports = async ({ github, context }) => {

    // console.log('entered unmark for issueid = ', context.payload.issue.number);
    // console.log('issue author is ', context.payload.issue.user.login);
    // console.log('issue latest commenter is ', context.payload.sender.login);


    let issuesP0 = await github.rest.issues.listForRepo({
        owner: context.repo.owner,
        repo: context.repo.repo,
        state: "open",
        labels: "p0"
    });

    let issuesP1 = await github.rest.issues.listForRepo({
        owner: context.repo.owner,
        repo: context.repo.repo,
        state: "open",
        labels: "p1"
    });


    if (issuesP0.status != 200 || issuesP1.status != 200)
        return

    let issuesP0Ar = issuesP0.data
    let issuesP1Ar = issuesP1.data
    const forteenDays = 14;
    const twentyEightDays = 28
    //filter out issues with exclude label "override-deprioritization".
    let FiltersP0issues = []
    let FiltersP1issues = []
    let excludeLabel = "override-deprioritization"
    const eventCommentP1 = `Issue will be deprioritized to P1 after 14 days. Please let us know if this is not required by adding the label 'override-deprioritization' to this issue.`
    const eventCommentP2 = `Issue will be deprioritized to P2 after 14 days. Please let us know if this is not required by adding the label 'override-deprioritization' to this issue.`
    const milliSecondOneDay = 86400000
    
    //for p0 label issues
    for (const issueP0 of issuesP0Ar) {
        console.log("line 46",issueP0)
        let labelsObj = issueP0.labels
        let labels = labelsObj.map((label)=>{
              return label.name
        })
        console.log("present label",issueP1.number,labels)
        if (!labels.includes(excludeLabel)) {
            FiltersP0issues.push(issueP0);
        }
    }

    for (const issueP1 of issuesP1Ar) {
        console.log("line 53",issueP1)
        let labelsObj = issueP0.labels
        let labels = labelsObj.map((label)=>{
              return label.name
        })
        console.log("present label",issueP1.number,labels)
        if (!labels.includes(excludeLabel)) {
            FiltersP1issues.push(issueP1);
        }
    }
  
  
    // for P1 label issues 
    for (const issue of FiltersP0issues) {
        let number = issue.number

        // issue event check the label add date 
        let resp = await github.rest.issues.listEventsForTimeline({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: number,
        });

        const events = resp.data
        let lastLabelEvent;
        // filter out last p0 label add event;
        for (const IssueEvent of events) {
            if (IssueEvent.event == 'labeled' && IssueEvent.label && IssueEvent.label.name == "p0") 
                {
                    lastLabelEvent = IssueEvent
                }
            else if (IssueEvent.event == 'labeled' && IssueEvent.label && IssueEvent.label.name == "p0") 
            {
                lastLabelEvent = undefined
            }

        }
        if(lastLabelEvent){
        // check label add time 
        let currentDate = new Date();
        let labeledDate = new Date(lastLabelEvent.created_at)
        console.log("time diff", number, (currentDate - labeledDate)/milliSecondOneDay)
        const timeDiff = (currentDate - labeledDate)/milliSecondOneDay

        // if time diference is more then 14 days and dont have comment then put comment 
        let allEventsStr = JSON.stringify(events)
      
        if (timeDiff > forteenDays && allEventsStr.indexOf(eventCommentP1) == -1)   // change 14 days
        {
            // comment on the issue 

            await github.rest.issues.createComment({
                issue_number: number,
                owner: context.repo.owner,
                repo: context.repo.repo,
                body: eventCommentP1
            });

        }
        else if (timeDiff > twentyEightDays && allEventsStr.indexOf(eventCommentP1) != -1) {

            // await github.rest.issues.removeLabel({
            //     issue_number: number,
            //     owner: context.repo.owner,
            //     repo: context.repo.repo,
            //     name: "p0"

            // })
            // await github.rest.issues.addLabels({
            //     issue_number: number,
            //     owner: context.repo.owner,
            //     repo: context.repo.repo,
            //     labels: ["p1"]

            // })  

            await github.rest.issues.createComment({
                issue_number: number,
                owner: context.repo.owner,
                repo: context.repo.repo,
                body: "issue remove label from p0 to p1"
            });

        }
        //if time diffecnce is more then 28 days and has comment then change the priority form p0 to p1
  
    }
}

    // for P2 issues 

    for (const issue of FiltersP1issues) {
        let number = issue.number

        // issue event check the label add date 
        let resp = await github.rest.issues.listEventsForTimeline({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: number,
        });

        const events = resp.data
        let lastLabelEvent;
        // filter out last p0 label add event;
        for (const IssueEvent of events) {
            if (IssueEvent.event == 'labeled' && IssueEvent.label && IssueEvent.label.name == "p1") {
                lastLabelEvent = IssueEvent
            }
            else if (IssueEvent.event == 'unlabeled' && IssueEvent.label && IssueEvent.label.name == "p1") {
                    lastLabelEvent = undefined
            }
        }

        if(lastLabelEvent){
        // check label add time 
        let currentDate = new Date();
        let labeledDate = new Date(lastLabelEvent.created_at)
        
        console.log("time diff", number, (currentDate - labeledDate)/milliSecondOneDay)
        const timeDiff = (currentDate - labeledDate)/milliSecondOneDay
        // if time diference is more then 14 days and dont have comment then put comment 

        let allEventsStr = JSON.stringify(events)

      
        if (timeDiff > forteenDays && allEventsStr.indexOf(eventCommentP2) == -1)   // change 14 days
        {
            // comment on the issue 
            await github.rest.issues.createComment({
                issue_number: number,
                owner: context.repo.owner,
                repo: context.repo.repo,
                body: eventCommentP2
            });

        }
        else if (timeDiff > twentyEightDays && allEventsStr.indexOf(eventCommentP2) != -1) {

            // await github.rest.issues.removeLabel({
            //     issue_number: number,
            //     owner: context.repo.owner,
            //     repo: context.repo.repo,
            //     name: "p1"

            // })
            // await github.rest.issues.addLabels({
            //     issue_number: number,
            //     owner: context.repo.owner,
            //     repo: context.repo.repo,
            //     labels: ["p2"]

            // })  

            await github.rest.issues.createComment({
                issue_number: number,
                owner: context.repo.owner,
                repo: context.repo.repo,
                body: "issue change label from p1 to p2"
            });


        }
    } 






        //if time diffecnce is more then 28 days and has comment then change the priority form p0 to p1






        // ------------------------------------------------------------------------------------------------------------------

    

    }

}
