document.addEventListener("DOMContentLoaded", function (event) {

	var width = 800;
	var height = 500;


	var links = [{
		source: "Die Hard",
		target: "Die Hard",
		type: "Die Hard"
	}, {
		source: "Die Hard",
		target: "Aliens",
		type: "Die Hard"
	}, {
		source: "Aliens",
		target: "Predator",
		type: "Die Hard"
	}, {
		source: "Aliens",
		target: "The Hitcher",
		type: "Die Hard"
	}, {
		source: "Police Story",
		target: "Die Hard",
		type: "Die Hard"
	}, {
		source: "Project A",
		target: "Police Story",
		type: "Die Hard"
	}, {
		source: "Pedicab driver",
		target: "Police Story",
		type: "Die Hard"
	}, {
		source: "Mad Max 2",
		target: "Die Hard",
		type: "Die Hard"
	}, {
		source: "Furious 6",
		target: "Mad Max 2",
		type: "Die Hard"
	}, {
		source: "Death Proof",
		target: "Mad Max 2",
		type: "Die Hard"
	}, {
		source: "Fast Five",
		target: "Mad Max 2",
		type: "Die Hard"
	}, {
		source: "Hard Boiled",
		target: "Hard Boiled",
		type: "Hard Boiled"
	}, {
		source: "A Hero never dies",
		target: "Hard Boiled",
		type: "Hard Boiled"
	}, {
		source: "Nowhere to hide",
		target: "A Hero never dies",
		type: "Hard Boiled"
	}, {
		source: "Domino",
		target: "A Hero never dies",
		type: "Hard Boiled"
	}, {
		source: "Exiled",
		target: "A Hero never dies",
		type: "Hard Boiled"
	}, {
		source: "Bullet in the head",
		target: "Hard Boiled",
		type: "Hard Boiled"
	}, {
		source: "Transformers",
		target: "Transformers",
		type: "Transformers"
	}, {
		source: "Miami Vice",
		target: "Transformers",
		type: "Transformers"
	}, {
		source: "Bourne ultimatum",
		target: "Transformers",
		type: "Transformers"
	}, {
		source: "Miss Bala",
		target: "Transformers",
		type: "Transformers"
	}, {
		source: "War of the worlds",
		target: "Transformers",
		type: "Transformers"
	}, {
		source: "Crippled avengers",
		target: "Crippled avengers",
		type: "Crippled avengers"
	}, {
		source: "Prodigal son",
		target: "Crippled avengers",
		type: "Crippled avengers"
	}, {
		source: "Fist of fury",
		target: "Crippled avengers",
		type: "Crippled avengers"
	}, {
		source: "Dirty Ho",
		target: "Crippled avengers",
		type: "Crippled avengers"
	}];

	var nodes = {};

	// Compute the distinct nodes from the links.
	links.forEach(function (link) {
		link.source = nodes[link.source] || (nodes[link.source] = {
			name: link.source
		});
		link.target = nodes[link.target] || (nodes[link.target] = {
			name: link.target
		});
	});

	var force = d3.layout.force()
		.nodes(d3.values(nodes))
		.links(links)
		.size([width, height])
		.linkDistance(100)
		.charge(-300)
		.on("tick", tick)
		.start();

	var svg = d3.select("#movies").append("svg")
		.attr("width", width)
		.attr("height", height);

	var link = svg.selectAll(".link")
		.data(force.links())
		.enter().append("line")
		.attr("class", "link");

	var node = svg.selectAll(".node")
		.data(force.nodes())
		.enter().append("g")
		.attr("class", "node")
		.on("mouseover", mouseover)
		.on("mouseout", mouseout)
		.on("click", click)
		.call(force.drag);

	node.append("circle")
		.attr("r", 8);

	node.append("text")
		.attr("x", 12)
		.attr("dy", ".35em")
		.attr("class", "title-text")
		.text(function (d) {
			return d.name;
		});

	function tick() {
		link
			.attr("x1", function (d) {
				return d.source.x;
			})
			.attr("y1", function (d) {
				return d.source.y;
			})
			.attr("x2", function (d) {
				return d.target.x;
			})
			.attr("y2", function (d) {
				return d.target.y;
			});

		node
			.attr("transform", function (d) {
				return "translate(" + d.x + "," + d.y + ")";
			});
	}

	function mouseover() {
		d3.select(this).select("circle").transition()
			.duration(750)
			.attr("r", 16);
	}

	function mouseout() {
		d3.select(this).select("circle").transition()
			.duration(750)
			.attr("r", 8);
	}

	function click() {
		var currentFilm = this;

	}

	d3.select("#title-text").append("svg")
		.attr("width", width)
		.attr("height", height / 2)
		.attr("class", "target-content");
});