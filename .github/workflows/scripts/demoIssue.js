/* 
When event occour, it will fetch all the open issues with label p0.
Check if label is more then 60 days old.
If yes, it will change the label to p1.
*/
module.exports = async ({ github, context }) => {
   
    for(let i=0;i<30;i++){  
        let tit = i + " issues"
        github.rest.issues.create({
        owner: context.repo.owner,
        repo: context.repo.repo,
        title: tit,
        labels: ["stat:awaiting response"]
      });
 
    }
}
