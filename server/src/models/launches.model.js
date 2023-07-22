const launches = new Map();

let latestLaunch = 100

launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer ISI',
    launchDate: new Date('December 21, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch)

function getAllLaunches(){
    return Array.from(launches.values())
}

function getAbortLaunch(launchId){
    return launches.has(launchId)
}

function newLaunches(launch){
    latestLaunch++
    launches.set(
        latestLaunch, 
        Object.assign(launch, {
            flightNumber: latestLaunch,
            customers: ['Zero To Mastery', 'Nasa'],
            upcoming: true,
            success: true,
        })
    );

    return launch
}

function abortLaunchById(launchId){
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    getAllLaunches,
    newLaunches,
    getAbortLaunch,
    abortLaunchById
}