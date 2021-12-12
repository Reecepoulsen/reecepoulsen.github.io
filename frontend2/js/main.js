let ol = document.getElementById("week-list");

const links = [
    {
        label: "Week 1",
        url: "./week1/index.html"
    },
    {
        label: "Week 2",
        url: "./week2/index.html"
    },
    {
        label: "Week 3",
        url: "./week3/index.html"
    },
    {
        label: "Week 4",
        url: "./week4/index.html"
    },
    {
        label: "Week 5",
        url: "./week5/index.html"
    },
    {
        label: "Week 6",
        url: "./week6/index.html"
    },
    {
        label: "Week 7",
        url: "./week7/index.html"
    },
    {
        label: "Week 8",
        url: "./week8/index.html"
    },
    {
        label: "Week 9",
        url: "./week9/index.html"
    }, 
    {
        label: "Week 10",
        url: "./week10/index.html"
    },
    {
        label: "Week 11",
        url: "./week11/index.html"
    },
    {
        label: "Final Project: Paragon",
        url: "./paragon/index.html"
    }
];

links.forEach(link => {
    let li = document.createElement('li');
    let anchor = document.createElement('a');

    anchor.textContent = link.label;
    anchor.href = link.url;
    li.appendChild(anchor);
    ol.appendChild(li);
});