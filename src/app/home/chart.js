let myChart = document.getElementById('myChart').getContext('2d');

let usersChart = new Chart(myChart, {
    type: 'line',
    data: {
        labels:['Total Bride', 'Total Groom', 'Total Bride from Nepal', 'Total Groom from Nepal', 'Total Bride from abroad', 'Total Groom from abroad'],
        datasets:[{
            label: 'User Statistics',
            data: [
                '16000',
                '16000',
                '11000',
                '11000',
                '5000',
                '5000'
            ],
            backgroundColor: 'rgb(3 168 242)'
        }]
    },
    options: {}
});