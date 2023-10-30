module.exports = async ({ github, context }) =>  {
    console.log("line 3", context.payload)
    // Check if it is a then return issue number else return PR number
    // const issueNumber = context.payload.issue ? context.payload.issue.number : context.payload.number    
    let issueNumber;
    let assigneesList; 
    //if issue event trigger then it will run this. 
    if(context.payload.issue){
        assigneesList = ['shmishra99','sushreebarsa']
        issueNumber =  context.payload.issue.number
    }
    else {
         assigneesList = ['ckulkarni97']
         issueNumber = context.payload.number 
    }
    console.log("assignee list",assigneesList)
    console.log("entered auto assignment for this issue:  ", issueNumber);
    if (!assigneesList.length) {
      console.log('No assignees found for this repo.');
      return;
    }
    let noOfAssignees = assigneesList.length;
    let selection = issueNumber % noOfAssignees;
    let assigneeForIssue = assigneesList[selection]

      console.log(
        'issue Number =', issueNumber + ', assigning issue to:',
        assigneeForIssue);
      return github.rest.issues.addAssignees({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        assignees:[assigneeForIssue] 
    });
  }
