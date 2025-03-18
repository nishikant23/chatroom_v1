export const getIst = (): Date => {
    const now  = new Date();
    console.log("UTC Time = ", now.toISOString());

    const utcTimeOffset = now.getTime() - now.getTimezoneOffset()*60000; //convert local m/c time to UTC
    // console.log("Now time = ", new Date(now.getTime()).toISOString());
    // console.log("OffsetZone time = ", new Date(now.getTimezoneOffset()).toISOString());
    // console.log("Converted Local time = ", new Date(now.getTimezoneOffset()*60000).toISOString());
    // console.log("utc time = ", new Date(utcTimeOffset).toISOString());


    // const indianTimeOffset = 5.5*60*60000; //offset for IST(India time)
    const istTime = new Date(utcTimeOffset);
    console.log("Indian Time = ", istTime.toISOString())
    return istTime;
} 