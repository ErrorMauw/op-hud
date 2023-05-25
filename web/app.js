var Ui = {};
var Zui = {};

Zui.Open = false;

$(document).ready(function () {
    window.addEventListener('message', function (event) {
        var data = event.data;

        switch (data.type) {
            case 'ui':
                Ui.Show(data)
                break;
            case 'updatehud':
                Ui.Update(data)
                break;
            case 'zui':
                Zui.Show(data)
                break;
        }
    });
});

Ui.Show = function (data) {
    if (data.action) {
        $(".container").fadeIn(300);
    } else {
        $(".container").fadeOut(300);
    }
};

Ui.Update = function (data) {
    Ui.Health(Math.trunc(data.health));
    Ui.Needs(Math.trunc(data.hunger), '.hud-hambre');
    Ui.Needs(Math.trunc(data.thirst), '.hud-sed');

    Ui.Bleeding(Math.trunc(data.bleeding));
    Ui.Oxygen(Math.trunc(data.oxygen), '.hud-oxigeno');

    if (Zui.Open) {
        const health = Zui.Percentage(data.health, 200);
        const bleeding = Zui.Percentage(data.bleeding, 100);

        $('.hud-vida p').text('Health ' + Math.trunc(health) + '%');
        $('.hud-hambre p').text('Hunger ' + Math.trunc(data.hunger) + '%');
        $('.hud-sed p').text('Thirst ' + Math.trunc(data.thirst) + '%');

        $('.hud-sangrado p').text('Bleeding ' + bleeding + '%');
        $('.hud-oxigeno p').text('Oxygen ' + Math.trunc(data.oxygen) + '%');
    };

};

Ui.Needs = function (needs, ident) {
    const ocultar = Ui.Range(91, 100);
    const verde = Ui.Range(71, 90);
    const amarillo = Ui.Range(51, 70);
    const naranja = Ui.Range(26, 50);
    const rojo = Ui.Range(0, 25);

    if (ocultar.indexOf(needs) !== -1) {
        // Ocultamos
        if (!(Zui.Open)) {
            $(ident).fadeOut(300);
        } else {
            $(ident).css("background-color", '#8cff0889');
            $(ident).css("border", '1px solid #8cff08');
            $(ident).css("box-shadow", '0 0 1.62vh 0.025vh #8cff084b');
            $(ident).fadeIn(300);
        }

    } else if (verde.indexOf(needs) !== -1) {
        // Verde
        $(ident).fadeIn(300);
        $(ident).css("background-color", '#8cff0889');
        $(ident).css("border", '1px solid #8cff08');
        $(ident).css("box-shadow", '0 0 1.62vh 0.025vh #8cff084b');
    } else if (amarillo.indexOf(needs) !== -1) {
        // Amarillo
        $(ident).fadeIn(300);
        $(ident).css("background-color", '#ffb90889');
        $(ident).css("border", '1px solid #ffb908');
        $(ident).css("box-shadow", '0 0 1.62vh 0.025vh #ffb9084b');
    } else if (naranja.indexOf(needs) !== -1) {
        // Naranja
        $(ident).fadeIn(300);
        $(ident).css("background-color", '#e85d0489');
        $(ident).css("border", '1px solid #e85d04');
        $(ident).css("box-shadow", '0 0 1.62vh 0.025vh #e85d044b');
    } else if (rojo.indexOf(needs) !== -1) {
        // Rojo
        $(ident).fadeIn(300);
        $(ident).css("background-color", '#6a040e89');
        $(ident).css("border", '1px solid #6a040e');
        $(ident).css("box-shadow", '0 0 1.62vh 0.025vh #6a040e4b');
    }
};

Ui.Oxygen = function (needs, ident) {

    const ocultar = Ui.Range(91, 100);
    const verde = Ui.Range(71, 90);
    const amarillo = Ui.Range(51, 70);
    const naranja = Ui.Range(26, 50);
    const rojo = Ui.Range(0, 25);

    if (ocultar.indexOf(needs) !== -1) {
        // Ocultamos
        if (!(Zui.Open)) {
            $(ident).fadeOut(300);
        } else {
            $(ident).css("background-color", '#8cff0889');
            $(ident).css("border", '1px solid #8cff08');
            $(ident).css("box-shadow", '0 0 1.62vh 0.025vh #8cff084b');

            $(ident + ' .hud-help-2').css("background-color", '#8cff0889');
            $(ident + ' .hud-help-2').css("border", '1px solid #8cff08');
            $(ident + ' .hud-help-2').css("box-shadow", '0 0 1.62vh 0.025vh #8cff084b');

            $(ident).fadeIn(300);
        }

    } else if (verde.indexOf(needs) !== -1) {
        // Verde
        $(ident).fadeIn(300);
        $(ident).css("background-color", '#8cff0889');
        $(ident).css("border", '1px solid #8cff08');
        $(ident).css("box-shadow", '0 0 1.62vh 0.025vh #8cff084b');

        $(ident + ' .hud-help-2').css("background-color", '#8cff0889');
        $(ident + ' .hud-help-2').css("border", '1px solid #8cff08');
        $(ident + ' .hud-help-2').css("box-shadow", '0 0 1.62vh 0.025vh #8cff084b');
    } else if (amarillo.indexOf(needs) !== -1) {
        // Amarillo
        $(ident).fadeIn(300);
        $(ident).css("background-color", '#ffb90889');
        $(ident).css("border", '1px solid #ffb908');
        $(ident).css("box-shadow", '0 0 1.62vh 0.025vh #ffb9084b');

        $(ident + ' .hud-help-2').css("background-color", '#ffb90889');
        $(ident + ' .hud-help-2').css("border", '1px solid #ffb908');
        $(ident + ' .hud-help-2').css("box-shadow", '0 0 1.62vh 0.025vh #ffb9084b');
    } else if (naranja.indexOf(needs) !== -1) {
        // Naranja
        $(ident).fadeIn(300);
        $(ident).css("background-color", '#e85d0489');
        $(ident).css("border", '1px solid #e85d04');
        $(ident).css("box-shadow", '0 0 1.62vh 0.025vh #e85d044b');

        $(ident + ' .hud-help-2').css("background-color", '#e85d0489');
        $(ident + ' .hud-help-2').css("border", '1px solid #e85d04');
        $(ident + ' .hud-help-2').css("box-shadow", '0 0 1.62vh 0.025vh #e85d044b');
    } else if (rojo.indexOf(needs) !== -1) {
        // Rojo
        $(ident).fadeIn(300);
        $(ident).css("background-color", '#6a040e89');
        $(ident).css("border", '1px solid #6a040e');
        $(ident).css("box-shadow", '0 0 1.62vh 0.025vh #6a040e4b');

        $(ident + ' .hud-help-2').css("background-color", '#6a040e89');
        $(ident + ' .hud-help-2').css("border", '1px solid #6a040e');
        $(ident + ' .hud-help-2').css("box-shadow", '0 0 1.62vh 0.025vh #6a040e4b');
    }
};

Ui.Health = function (health) {

    const ocultar = Ui.Range(181, 200);
    const verde = Ui.Range(141, 180);
    const amarillo = Ui.Range(101, 140);
    const naranja = Ui.Range(41, 100);
    const rojo = Ui.Range(0, 40);

    if (ocultar.indexOf(health) !== -1) {
        // Ocultamos
        if (!(Zui.Open)) {
            $(".hud-vida").fadeOut(300);
        } else {
            $(".hud-vida").css("background-color", '#8cff0889');
            $(".hud-vida").css("border", '1px solid #8cff08');
            $(".hud-vida").css("box-shadow", '0 0 1.62vh 0.025vh #8cff084b');
            $(".hud-vida").fadeIn(300);
        }
    } else if (verde.indexOf(health) !== -1) {
        // Verde
        $(".hud-vida").fadeIn(300);
        $(".hud-vida").css("background-color", '#8cff0889');
        $(".hud-vida").css("border", '1px solid #8cff08');
        $(".hud-vida").css("box-shadow", '0 0 1.62vh 0.025vh #8cff084b');
    } else if (amarillo.indexOf(health) !== -1) {
        // Amarillo
        $(".hud-vida").fadeIn(300);
        $(".hud-vida").css("background-color", '#ffb90889');
        $(".hud-vida").css("border", '1px solid #ffb908');
        $(".hud-vida").css("box-shadow", '0 0 1.62vh 0.025vh #ffb9084b');
    } else if (naranja.indexOf(health) !== -1) {
        // Naranja
        $(".hud-vida").fadeIn(300);
        $(".hud-vida").css("background-color", '#e85d0489');
        $(".hud-vida").css("border", '1px solid #e85d04');
        $(".hud-vida").css("box-shadow", '0 0 1.62vh 0.025vh #e85d044b');
    } else if (rojo.indexOf(health) !== -1) {
        // Rojo
        $(".hud-vida").fadeIn(300);
        $(".hud-vida").css("background-color", '#6a040e89');
        $(".hud-vida").css("border", '1px solid #6a040e');
        $(".hud-vida").css("box-shadow", '0 0 1.62vh 0.025vh #6a040e4b');
    }
};

Ui.Bleeding = function (bleeding) {
    const ocultar = Ui.Range(0, 5);
    const rojo = Ui.Range(6, 100);

    if (ocultar.indexOf(bleeding) !== -1) {
        // Ocultamos
        if (!(Zui.Open)) {
            $('.hud-sangrado').fadeOut(300);
        } else {
            $(".hud-sangrado").css("background-color", '#8cff0889');
            $(".hud-sangrado").css("border", '1px solid #8cff08');
            $(".hud-sangrado").css("box-shadow", '0 0 1.62vh 0.025vh #8cff084b');

            $(".hud-sangrado .hud-help-2").css("background-color", '#8cff0889');
            $(".hud-sangrado .hud-help-2").css("border", '1px solid #8cff08');
            $(".hud-sangrado .hud-help-2").css("box-shadow", '0 0 1.62vh 0.025vh #8cff084b');

            $('.hud-sangrado').fadeIn(300);
        }
    } else if (rojo.indexOf(bleeding) !== -1) {
        // Rojo
        $('.hud-sangrado').fadeIn(300);

        $('.hud-sangrado').css("background-color", '#6a040e89');
        $(".hud-sangrado").css("border", '1px solid #6a040e');
        $(".hud-sangrado").css("box-shadow", '0 0 1.62vh 0.025vh #6a040e4b');

        $('.hud-sangrado .hud-help-2').css("background-color", '#6a040e89');
        $(".hud-sangrado .hud-help-2").css("border", '1px solid #6a040e');
        $(".hud-sangrado .hud-help-2").css("box-shadow", '0 0 1.62vh 0.025vh #6a040e4b');
    }
};

Ui.Range = function (start, end) {
    const rangeArray = []
    for (let i = start; i <= end; i++) {
        rangeArray.push(i)
    }
    return rangeArray
};


Zui.Show = function (data) {
    if (data.action) {
        Zui.Open = true

        $('body').css("background-color", 'rgba(0, 0, 0, 0.453)');
        $('.hud-vida p').fadeIn(300);
        $('.hud-hambre p').fadeIn(300);
        $('.hud-sed p').fadeIn(300);

    } else {
        Zui.Open = false

        $('body').css("background-color", 'rgba(255, 255, 255, 0)');

        $('.hud-vida p').fadeOut(300);
        $('.hud-hambre p').fadeOut(300);
        $('.hud-sed p').fadeOut(300);
        $('.hud-sangrado p').fadeOut(300);
        $('.hud-oxigeno p').fadeOut(300);
    }
};

Zui.Percentage = function (numA, numB) {
    return (numA / numB) * 100;
}

$(".hud-sangrado").hover(
    function () {
        $(".hud-sangrado p").fadeIn(100);
    }, function () {
        $(".hud-sangrado p").fadeOut(100);
    }
);

$(".hud-oxigeno").hover(
    function () {
        $(".hud-oxigeno p").fadeIn(100);
    }, function () {
        $(".hud-oxigeno p").fadeOut(100);
    }
);