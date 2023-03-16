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


   let resp =  await github.rest.issues.listEventsForTimeline({
    owner: context.repo.owner,
        repo:context.repo.repo,
        issue_number:1,
    });

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
