function average(scores){
    //add all scores together
    var total = 0;
    scores.forEach(function(score){
        total+=score;
    });
    
    //divide by toatl number of scores
    var avg = total/scores.length;
    
    //round the average
    return Math.round(avg);
}

var scores = [100,94,85,65,89,50,25,10,15,45];
console.log(average(scores));