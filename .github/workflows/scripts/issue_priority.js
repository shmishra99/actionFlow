// const CONSTENT_VALUES = require('./constant')

/* 
When author of the issue/pr comment than
stat:awaiting response and stale label will be
removed.
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
    let issueList;
    if (issues.status == 200) {
        issueList = issues.data
    }

    for (let i = 0; i < issueList.length; i++) {

        let number = issueList[i].number;
        let resp = await github.rest.issues.listEventsForTimeline({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: number,
        });
        let events = resp.data;
        for (let i = 0; i < events.length; i++) {
            let event_details = events[i];

            if (event_details.event == 'labeled' && event_details.labels && event_details.labels.name == "p0") {

                let currentDate = new Date();
                let labeledDate = new Date(event_details.created_at)

                if (currentDate - labeledDate > 0) {
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







    console.log(JSON.stringify(resp))



    // if (context.payload.issue.state !== CONSTENT_VALUES.GLOBALS.STATE.CLOSED &&
    //     context.payload.issue.user.login == context.payload.sender.login) {




    //     for (const label of context.payload.issue.labels) {

    //         if (label.name.includes(CONSTENT_VALUES.GLOBALS.LABELS.STALE)) {
    //             console.log("Removing label: " + CONSTENT_VALUES.GLOBALS.LABELS.STALE)
    //             await github.rest.issues.removeLabel({
    //                 issue_number: context.issue.number,
    //                 owner: context.repo.owner,
    //                 repo: context.repo.repo,
    //                 name: CONSTENT_VALUES.GLOBALS.LABELS.STALE

    //             })
    //         }
    //         if (label.name.includes(CONSTENT_VALUES.GLOBALS.LABELS.AWAITINGRES)) {
    //             console.log("Removing label : " + CONSTENT_VALUES.GLOBALS.LABELS.AWAITINGRES)
    //             await github.rest.issues.removeLabel({
    //                 issue_number: context.issue.number,
    //                 owner: context.repo.owner,
    //                 repo: context.repo.repo,
    //                 name: CONSTENT_VALUES.GLOBALS.LABELS.AWAITINGRES

    //             })
    //         }
    //     }
    // }
}
