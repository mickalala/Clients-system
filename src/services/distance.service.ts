import clientsRepository from "../repositories/clients.repository";

export default async function minDistanceService() {
    try {
        const clients = await clientsRepository.getAllClients();
        return distancesArrays(clients.rows);

    } catch (error) {
        console.log(error)
        throw { type: "Internal_server_error", message: "Erro no servidor" }
    }
}

function distancesArrays(clients) {
    const clientsCoordinatesArray = [{
        name: "sede",
        value: [0, 0],
    },];
    clients.map((c) => {
        clientsCoordinatesArray.push({ name: c.username, value: c.addresscoordinates })
    })
     return routesArray(clientsCoordinatesArray)
}

const distances = [];
function routesArray(clientsCoordinatesArray) {
    for (let i = 0; i < clientsCoordinatesArray.length; i++) {
        for (let j = i + 1; j < clientsCoordinatesArray.length; j++) {
            const dist = distanceBetweenTwoPoints(
                clientsCoordinatesArray[i].value,
                clientsCoordinatesArray[j].value,
            );

            const route = {
                route: `${clientsCoordinatesArray[i].name}-${clientsCoordinatesArray[j].name}`,
                value: dist,
            };
            distances.push(route);
        }
    }
   return calculateRouterAndDistance(clientsCoordinatesArray);
}
// serão feitos n*(n-1) / 2 cálculos, onde n é o número de usuários.

function calculateRouterAndDistance(clientsCoordinatesArray) {
    let currentPoint = "sede";
    let routesTraveled = [];
    let allDistances = [];
    let counter = 0;
    const limit = clientsCoordinatesArray.length - 1;

    while (counter < limit) {
        counter += 1;
        const newPoint = foundMinDistance(
            currentPoint,
            routesTraveled,
            allDistances,
        );
        currentPoint = newPoint;
    }

    getLastRoute(currentPoint, routesTraveled, allDistances);

    const stops = [];
    let totalDistance = 0;

    for (let i = 0; i < allDistances.length; i++) {
        totalDistance += allDistances[i];
    }
    for (let i = 0; i < routesTraveled.length; i++) {
        const point = routesTraveled[i].split("-");
        if (!stops.includes(point[0])) stops.push(point[0]);
        if (!stops.includes(point[1])) stops.push(point[1]);
    }

    console.log(stops);
    console.log("distancia percorrida: " + totalDistance);
    return {
        stops: stops,
        totalDistance: totalDistance,
    };
}

function distanceBetweenTwoPoints(A, B) {
    return Math.sqrt(Math.pow(A[0] - B[0], 2) + Math.pow(A[1] - B[1], 2));
}

function getLastRoute(currentPoint, routesTraveled, allDistances) {
    const route = distances.find(
        (element) =>
            element.route === `sede-${currentPoint}` ||
            element.route === `${currentPoint}-sede`,
    );

    routesTraveled.push(route.route);
    allDistances.push(route.value);
    return;
}

function foundMinDistance(currentPoint, routesTraveled, allDistances) {
    let minDistance = 999;
    let path = "";
    let newPoint = "";
    for (let i = 0; i < distances.length; i++) {
        if (
            distances[i].route.includes(currentPoint) &&
            distances[i].value < minDistance &&
            !routesTraveled.includes(distances[i].route)
        ) {
            minDistance = distances[i].value;
            path = distances[i].route;
        }
    }

    const cities = path.split("-");

    newPoint = currentPoint === cities[0] ? cities[1] : cities[0];

    currentPoint = newPoint;

    routesTraveled.push(path);
    allDistances.push(minDistance);

    return currentPoint;
}
