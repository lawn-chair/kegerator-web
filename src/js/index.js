/*global u*/

function updateTemp() {
    fetch('/api/temp')
        .then((response) => {
            return updateTempDisplay(response.json());
        })
        .catch((error) => { console.log(error); });

    setTimeout(updateTemp, 1000);
}

function updateTempDisplay(response) {
    u('#current-temp .value').html(response.temp);
    u('#setpoint .value').html(response.setpoint);
    return true;
}

function updateSetpoint(direction) {
    fetch('/api/temp', {
        method: 'POST',
        data: JSON.stringify({ setpoint: direction
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            return updateTempDisplay(response.json());
        })
        .catch((error) => { console.log(error); });
}

u(document).on('DOMContentLoaded', () => {
    setTimeout(updateTemp, 1000);

    u('button#down').on('click', () => { updateSetpoint('-'); });
    u('button#up').on('click', () => { updateSetpoint('+'); });
});