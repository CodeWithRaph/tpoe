var gain = 0;
var tempo = 0;
var prevision = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var profit_color = '#ffffff';

const ctx = document.getElementById('myChart');

let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [{
        label: 'Amount Growth',
        data: prevision,
        borderColor: 'hsl(42, 54%, 61%)',
        borderWidth: 1,
        tension: 0.2
    }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
    }
    }
});

function openSection(nb1, nb2, nb3, nb4, taux){
    document.getElementById('submit2').addEventListener('click', function(){
        var sum = document.getElementById('sum').value;
        var portion = Math.floor(sum / nb2);
        var amount = portion * nb2;
        var nb_pcs = portion * nb1;
        var sell_for = nb_pcs / nb3 * nb4;

        document.getElementById('amount').innerHTML = "The amount you should trade : " + amount;
        document.getElementById('pcs').innerHTML = "Against : " + nb_pcs + " pcs";
        document.getElementById('pcs2').innerHTML = "Sell : " + nb_pcs + " pcs";
        document.getElementById('amount2').innerHTML = "For : " + sell_for;
        document.getElementById('earning').innerHTML = "Earning : " + (sell_for - amount);

        prevision = [0]
        prevision[0] = amount;
        for (let i = 0; i <= 10; i++){
            amount = Math.floor(amount * (taux+100)/100);
            prevision.push(amount);
        }

        chart.data.datasets[0].data = prevision;

        chart.update();
    });
}

document.getElementById('submit').addEventListener('click', function(){
    
    var nb1 = document.getElementById('nb1').value;
    var nb2 = document.getElementById('nb2').value;
    var nb3 = document.getElementById('nb3').value;
    var nb4 = document.getElementById('nb4').value;

    // valeur à gauche supérieures
    if(nb1 > nb2 || nb3 > nb4){
        if(nb1 > nb3){
            gain = (nb1/nb2) * 100 / (nb3/nb4) - 100;
        }else{
            gain = -(nb3 * 100 / nb1 - 100);
        }
    // valeur à droite supérieures
    }else{
        if(nb4 > nb2){
            gain =  (nb4/nb3) * 100 / (nb2/nb1) - 100;
        }else{
            gain =  -((nb2/nb1) * 100 / (nb4/nb3) - 100);
        }
    }
    
    if(gain >= 0){
        document.getElementById('profit_display').innerHTML = "+" + Math.round(gain) + "% Profit";
        document.getElementById('card1').style.boxShadow = "0 0 0px var(--verified-color)";
        document.querySelector('h2').style.color = "var(--verified-color)";
        document.querySelector('h2').style.filter = "drop-shadow(0 0 0 var(--verified-color))";
        if(gain >= 15){
            document.getElementById('card1').style.boxShadow = "0 0 30px var(--verified-color)";  
            document.querySelector('h2').style.filter = "drop-shadow(0 0 0.75rem var(--verified-color))";
        }
    }else{
        document.getElementById('profit_display').innerHTML = Math.round(gain) + "% Profit";
        document.getElementById('card1').style.boxShadow = "0 0 30px var(--fail-color)";
        document.querySelector('h2').style.color = "var(--fail-color)";
        document.querySelector('h2').style.filter = "drop-shadow(0 0 0.75rem var(--fail-color))";
    }
    document.getElementById('reminder').innerHTML = nb1 + " : " + nb2 + "<br>" + nb3 + " : " + nb4;
    document.getElementById('guide_section').style.display = "block";
    openSection(nb1, nb2, nb3, nb4, gain);
});






