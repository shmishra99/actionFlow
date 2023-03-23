/* 
When event occour, it will fetch all the open issues with label p0.
Check if label is more then 60 days old.
If yes, it will change the label to p1.
*/
module.exports = async ({ github, context }) => {
   
    //fetch all the open issues with label p0
    // let issues = await github.rest.issues.listForRepo({
    //     owner: context.repo.owner,
    //     repo: context.repo.repo,
    //     state: "open",
    //     labels: "p0"
    // });

    for(let i=0;i<2;i++){
        let tit = i + " issue"
        github.rest.issues.create({
        owner: context.repo.owner,
        repo: context.repo.repo,
        title: tit,
        labels:["stat:awaiting response"]
      });
 
    }

    
    
    

}
