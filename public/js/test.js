var chart1 = c3.generate({
	bindto: "#temp",
	data: {
		url: '/data/temp.csv',
		type: 'spline'
	}
});

var chart2 = c3.generate({
	data: {
		columns: [
			["eda", 10, 4, 5, 3, 2, 5]
		],
		colors: {
			eda: "#c13df3"
		},
		type: 'spline'
	}
});
$(eda).append(chart2.element);

var chart3 = c3.generate({
	data: {
		columns: [
			["bvp", 10, 4, 5, 3, 2, 5]
		],
		colors: {
			bvp: "#485dec"
		},
		type: 'spline'
	}
});
$(bvp).append(chart3.element);

var chart4 = c3.generate({
	data: {
		columns: [
			["acc", 10, 4, 5, 3, 2, 5]
		],
		colors: {
			acc: "##794363"
		},
		type: 'spline'
	}
});
$(acc).append(chart4.element);

var chart5 = c3.generate({
	data: {
		columns: [
			["ibi", 10, 4, 5, 3, 2, 5]
		],
		colors: {
			ibi: "#b3174e"
		},
		type: 'spline'
	}
});
$(ibi).append(chart5.element);

var chart6 = c3.generate({
	data: {
		xs: {
            'data1': 'x1',
            'data2': 'x2',
        },
        columns: [
            ['x1', 10, 30, 45, 50, 70, 100],
            ['x2', 30, 50, 75, 100, 120],
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 20, 180, 240, 100, 190]
        ],
		type: 'spline'
	}
});
$(multi).append(chart6.element);