import observable = require("data/observable");
import pages = require("ui/page");
import {AnimationCurve} from "ui/enums";

let page;

export function pageLoaded(args: observable.EventData) {
    page = <pages.Page>args.object;
    loadQuote();
    loadChart();
}

function getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function loadQuote() {

    let myLayout = page.getViewById("layout");
    let lblQuote = page.getViewById("lblQuote");

    lblQuote.animate({
        translate: { x: -300, y: 0 },
        duration: 250,
        curve: AnimationCurve.linear
    }).then(() => {

        fetch("http://your-web-server.com/billmurray/api/quote/GetQuote").then(response => { return response.json(); }).then(function (r) {

            myLayout.bindingContext = {
                quote: "\"" + r.Data.QuoteText + "\" - " + r.Data.QuoteSource,
                image: "https://www.fillmurray.com/200/" + getRandomNumber(295, 305)
            };

            lblQuote.animate({
                translate: { x: 0, y: 0 },
                duration: 1000,
                curve: AnimationCurve.spring
            });
        });
    });
}

function loadChart() {

    let chartData = new observable.Observable();

    chartData.set("movies", [
        { movie: "Ghostbusters", count: 2 },
        { movie: "Caddyshack", count: 2 },
        { movie: "Stripes", count: 1 },
        { movie: "Groundhog Day", count: 2 }
    ]);

    page.bindingContext = chartData;

}