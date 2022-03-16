function solution(n, costs) {
    var answer = 0;
    let linked = new Array(costs.length).fill(0);
    linked.map((data,index)=>linked[index]=index);
    costs.sort((a,b)=>a[2]-b[2]);
    const find=(node)=>{
        if (node == linked[node])
            return node;
        else return(linked[node]= find(linked[node]))
    };
    for (let i = 0 ; i <costs.length; i++)
    {
        let start = find(costs[i][0]);
        let end = find(costs[i][1]);
        if (start !== end)
        {
            linked[start]=end;
            answer += costs[i][2];
        }
    }
    return answer;
}

