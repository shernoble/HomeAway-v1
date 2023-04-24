function diff(day1, day2){
    const time_diff=day1.getTime()-day2.getTime();
    const days_diff=time_diff/(1000*3600*24);
    return days_diff;
}