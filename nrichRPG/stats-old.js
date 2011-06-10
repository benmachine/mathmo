/*
	stats.js - statistics, probability, and combinatorics
*/

// n! = n.(n-1)!
function factorial(n)
{
	if((n<0) || (n!=Math.round(n)))
		console.log("Non-integer or negative number sent to factorial()!");
	if(n<2)
		return(1); // 0! = 1! = 1
	return(n*factorial(n-1)); // recursion may be inefficient in this case, but I don't care
}

// nCr, aka {n \choose r}
//  = n!/(r!(n-r)!)
function combi(n, r)
{
	return(factorial(n) / (factorial(r) * factorial(n-r))); // again, inefficient (we could do the whole 'cancel' thing) but I don't care...
	// if efficiency and speed mattered, we wouldn't be using JS, would we now?
}

// Probability mass functions (discrete distns)
function massBin(x, n, p) {return combi(n, x)*Math.pow(p, x)*Math.pow(1-p, n-x);}
function massPo(x, l) {return Math.exp(-l)*Math.pow(l, x)/factorial(x);}
function massGeo(x, p) {return p*Math.pow(1-p, x-1);}

// Probability density functions (continuous distns)
function massN(x, m, s) {return Math.exp(-Math.pow((x-m)/s, 2)/2)/(s*Math.sqrt(2*Math.PI));} // Normal distribution, N(m, s^2)
function massNZ(x) {return Math.exp(-x*x/2)/Math.sqrt(2*Math.PI);} // Standard normal, N(0, 1)

// Random generation of samples from continuous distns
function genN(m, s)
{
	return(m+s*genNZ()[0]);
}
function genNZ() // returns a pair of independent N(0,1) rvs.
{
	var u=1-Math.random(); // (0, 1]
	var v=1-Math.random(); // (0, 1]
	var r=Math.sqrt(-2*Math.log(u));
	var th=2*Math.PI*v;
	var x=r*Math.cos(th);
	var y=r*Math.sin(th);
	return([x,y]);
}

// Statistical tables
function Phi_Taylor(x) {return 0.5+(x * 0.398942) + ((Math.pow(x, 3) / 6) * -0.398942) + ((Math.pow(x, 5) / 120) * 1.19683) + ((Math.pow(x, 7) / 5040) * -5.98413) + ((Math.pow(x, 9) / 362880) * 41.8889);} // good for |x|<1; otherwise use tableN.  Coeffs generated by nraph 0.2

var tableT=new mktableT();
function mktableT()
{
	var that = this;
	that.p=[0.75,0.9,0.95,0.975,0.99,0.995,0.9975,0.999,0.9995];
	that.v=["&nu;=1",2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,40,60,120,"&infin;"];
	// Entering all this data was tedious :(
	that.values=[['1.000',3.078,6.314,12.71,31.82,63.66,127.3,318.3,636.6],
	[0.816,1.886,2.920,4.303,6.965,9.925,14.09,22.33,31.60],
	[0.765,1.638,2.353,3.182,4.541,5.841,7.453,10.21,12.92],
	[0.741,1.533,2.132,2.776,3.747,4.604,5.598,7.173,8.610],
	[0.727,1.476,2.015,2.571,3.365,4.032,4.773,5.894,6.869],
	[0.718,1.440,1.943,2.447,3.143,3.707,4.317,5.208,5.959],
	[0.711,1.415,1.895,2.365,2.998,3.499,4.029,4.785,5.408],
	[0.706,1.397,1.860,2.306,2.896,3.355,3.833,4.501,5.041],
	[0.703,1.383,1.833,2.262,2.821,3.250,3.690,4.297,4.781],
	[0.700,1.372,1.812,2.228,2.764,3.169,3.581,4.144,4.587],
	[0.697,1.363,1.796,2.201,2.718,3.106,3.497,4.025,4.437],
	[0.695,1.356,1.782,2.179,2.681,3.055,3.428,3.930,4.318],
	[0.694,1.350,1.771,2.160,2.650,3.012,3.372,3.852,4.221],
	[0.692,1.345,1.761,2.145,2.624,2.977,3.326,3.787,4.140],
	[0.691,1.341,1.753,2.131,2.602,2.947,3.286,3.733,4.073],
	[0.690,1.337,1.746,2.120,2.583,2.921,3.252,3.686,4.015],
	[0.689,1.333,1.740,2.110,2.567,2.898,3.222,3.646,3.965],
	[0.688,1.330,1.734,2.101,2.552,2.878,3.197,3.610,3.922],
	[0.688,1.328,1.729,2.093,2.539,2.861,3.174,3.579,3.883],
	[0.687,1.325,1.725,2.086,2.528,2.845,3.153,3.552,3.850],
	[0.686,1.323,1.721,2.080,2.518,2.831,3.135,3.527,3.819],
	[0.686,1.321,1.717,2.074,2.508,2.819,3.119,3.505,3.792],
	[0.685,1.319,1.714,2.069,2.500,2.807,3.104,3.485,3.768],
	[0.685,1.318,1.711,2.064,2.492,2.797,3.091,3.467,3.745],
	[0.684,1.316,1.708,2.060,2.485,2.787,3.078,3.450,3.725],
	[0.684,1.315,1.706,2.056,2.479,2.779,3.067,3.435,3.707],
	[0.684,1.314,1.703,2.052,2.473,2.771,3.057,3.421,3.689],
	[0.683,1.313,1.701,2.048,2.467,2.763,3.047,3.408,3.674],
	[0.683,1.311,1.699,2.045,2.462,2.756,3.038,3.396,3.660],
	[0.683,1.310,1.697,2.042,2.457,2.750,3.030,3.385,3.646],
	[0.681,1.303,1.684,2.021,2.423,2.704,2.971,3.307,3.551],
	[0.679,1.296,1.671,'2.000',2.390,2.660,2.915,3.232,3.460],
	[0.677,1.289,1.658,1.980,2.358,2.617,2.860,3.160,3.373],
	[0.674,1.282,1.645,1.960,2.326,2.576,2.807,3.090,3.291]];
	that.writehtml=function(open, close)
	{
		var a="<table border=1 cellpadding=0>";
		a+="<tr><td>"+open+"p"+close+"</td>";
		for(var i=0;i<9;i++)
			a+="<td>"+open+(i%3==1?"<strong>":"")+that.p[i]+(i%3==1?"</strong>":"")+close+"</td>";
		a+="</tr><tr><td>"+open+"<font color=\"white\">0.0-</font>"+close+"</td>";
		for(i=0;i<9;i++)
			a+="<td>"+open+"<font color=\"white\">0.0000-</font>"+close+"</td>";
		a+="</tr>";
		for(i=1;i<35;i++)
		{
			if(i&&((i%5)==0)) a+="<tr><td></td></tr>";
			a+="<tr><td>"+open+that.v[i-1]+close+"</td>";
			for(var j=0;j<9;j++)
			{
				a+="<td>"+open+(j%3==1?"<strong>":"")+that.values[i-1][j].toString().rPad(5, '0')+(j%3==1?"</strong>":"")+close+"</td>";
			}
			a+="</tr>";
		}
		a+="</table>";
		return(a.replace(/&gt;/g, ">").replace(/&lt;/g, "<"));
	};
}

var tableChi=new mktableChi();
function mktableChi()
{
	var that = this;
	that.p=[0.01,0.025,0.05,0.9,0.95,0.975,0.99,0.995,0.999];
	that.v=["&nu;=1",2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,30,40,50,60,70,80,90,100];
	// Entering all this data was tedious :(
	that.values=[['0.0&sup3;1571', '0.0&sup3;9821', '0.0&sup2;3932', 2.706, 3.841, 5.024,6.635, 7.8794, 10.83],
	[0.02010, 0.05064, 0.1026, 4.605, 5.991, 7.378, 9.210, 10.60, 13.82],
	[0.1148, 0.2158, 0.3518, 6.251, 7.815, 9.348, 11.34, 12.84, 16.27],
	[0.2971, 0.4844, 0.7107, 7.779, 9.488, 11.14, 13.28, 14.86, 18.47],
	[0.5543, 0.8312, 1.145, 9.236, 11.07, 12.83, 15.09, 16.75, 20.51],
	[0.8721, 1.237, 1.635, 10.64, 12.59, 14.45, 16.81, 18.55, 22.46],
	[1.239, 1.690, 2.167, 12.02, 14.07, 16.01, 18.48, 20.28, 24.32],
	[1.647, 2.180, 2.733, 13.36, 15.51, 17.53, 20.09, 21.95, 26.12],
	[2.088, 2.700, 3.325, 14.68, 16.92, 19.02, 21.67, 23.59, 27.88],
	[2.558, 3.247, 3.940, 15.99, 18.31, 20.48, 23.21, 25.19, 29.59],
	[3.053, 3.816, 4.575, 17.28, 19.68, 21.92, 24.73, 26.76, 31.26],
	[3.571, 4.404, 5.226, 18.55, 21.03, 23.34, 26.22, 28.30, 32.91],
	[4.107, 5.009, 5.892, 19.81, 22.36, 24.74, 27.69, 29.82, 34.53],
	[4.660, 5.629, 6.571, 21.06, 23.68, 26.12, 29.14, 31.32, 36.12],
	[5.229, 6.262, 7.261, 22.31, '25.00', 27.49, 30.58, 32.80, 37.70],
	[5.812, 6.908, 7.962, 23.54, 26.30, 28.85, '32.00', 34.27, 39.25],
	[6.408, 7.564, 8.672, 24.77, 27.59, 30.19, 33.41, 35.72, 40.79],
	[7.015, 8.231, 9.390, 25.99, 28.87, 31.53, 34.81, 37.16, 42.31],
	[7.633, 8.907, 10.12, 27.20, 30.14, 32.85, 36.19, 38.58, 43.82],
	[8.260, 9.591, 10.85, 28.41, 31.41, 34.17, 37.57, '40.00', 45.31],
	[8.897, 10.28, 11.59, 29.62, 32.67, 35.48, 38.93, 41.40, 46.80],
	[9.542, 10.98, 12.34, 30.81, 33.92, 36.78, 40.29, 42.80, 48.27],
	[10.20, 11.69, 13.09, 32.01, 35.17, 38.08, 41.64, 44.18, 49.73],
	[10.86, 12.40, 13.85, 33.20, 36.42, 39.36, 42.98, 45.56, 51.18],
	[11.52, 13.12, 14.61, 34.38, 37.65, 40.65, 44.31, 46.93, 52.62],
	[14.95, 16.79, 18.49, 40.26, 43.77, 46.98, 50.89, 53.67, 59.70],
	[22.16, 24.43, 26.51, 51.81, 55.76, 59.34, 63.69, 66.77, 73.40],
	[29.71, 32.36, 34.76, 63.17, 67.50, 71.42, 76.15, 79.49, 86.66],
	[37.48, 40.48, 43.19, 74.40, 79.08, 83.30, 88.38, 91.95, 99.61],
	[45.44, 48.76, 51.74, 85.53, 90.53, 95.02, 100.4, 104.2, 112.3],
	[53.54, 57.15, 60.39, 96.58, 101.9, 106.6, 112.3, 116.3, 124.8],
	[61.75, 65.65, 69.13, 107.6, 113.1, 118.1, 124.1, 128.3, 137.2],
	[70.06, 74.22, 77.93, 118.5, 124.3, 129.6, 135.8, 140.2, 149.4]];
	that.writehtml=function(open, close)
	{
		var a="<table border=1 cellpadding=0>";
		a+="<tr><td>"+open+"p"+close+"</td><td></td>";
		for(var i=0;i<9;i++)
		{
			a+="<td>"+open+(i%3==1?"<strong>":"")+that.p[i]+(i%3==1?"</strong>":"")+close+"</td>";
			if(i==2)
				a+="<td></td>";
		}
		a+="</tr><tr><td>"+open+"<font color=\"white\">0.0-</font>"+close+"</td><td width=3></td>";
		for(i=0;i<9;i++)
		{
			a+="<td>"+open+"<font color=\"white\">0.0000-</font>"+close+"</td>";
			if(i==2)
				a+="<td width=3></td>";
		}
		a+="</tr>";
		for(i=1;i<34;i++)
		{
			if(i&&((i%5)==0)) a+="<tr><td></td></tr>";
			a+="<tr><td>"+open+that.v[i-1]+close+"</td><td></td>";
			for(var j=0;j<9;j++)
			{
				a+="<td>"+open+(j%3==1?"<strong>":"")+that.values[i-1][j].toString().rPad(5, '0')+(j%3==1?"</strong>":"")+close+"</td>";
				if(j==2)
					a+="<td></td>";
			}
			a+="</tr>";
		}
		a+="</table>";
		return(a.replace(/&gt;/g, ">").replace(/&lt;/g, "<"));
	};
}

var tableN=new mktableN();
function mktableN()
{
	var that = this;
	that.values=new Array(3000);
	that.table=new Array(300);
	that.charac=new Array(300); // characteristics
	that.ready=false;
	that.populate=function()
	{
		if(!that.ready)
		{
			var p=0.5;
			for(var i=0;i<300;i++)
				that.charac[i]=0;
			for(i=0;i<3000;i++)
			{
				that.values[i]=p;
				if((i%10)==0)
					that.table[i/10]=that.values[i];
				else
					that.charac[10*Math.floor(i/100)+(i%10)]+=that.values[i]-that.table[Math.floor(i/10)];
				p+=0.001*massNZ((i+0.5)*0.001);
			}
			that.ready=true;
		}
	};
	that.write=function() // Horrific pile of painful LaTeX in a feeble attempt to make it look table-like.  TODO: re-do that using proper l|c||r\\hline
	{
		if(!that.ready)
			return("\\mbox{Table not populated!}");
		var a="\\begin{array}{c}|&-&|&-&-&-&-&-&-&-&-&-&-&-&-&-&|&-&-&-&&-&-&-&&-&-&-&|\\\\";
		a+="|&z&|&0&&1&2&3&&4&5&6&&7&8&9&|&1&2&3&&4&5&6&&7&8&9&|\\\\";
		a+="|&&|&&&&&&&&&&&&&&|&&&&&A&D&D&&&&&|\\\\";
		a+="|&-&|&-&-&-&-&-&-&-&-&-&-&-&-&-&|&-&-&-&&-&-&-&&-&-&-&|\\\\";
		for(var i=0;i<30;i++)
		{
			if(i&&((i%5)==0)) a+="|&&|&&&&&&&&&&&&&&|&&&&&&&&&&&&|\\\\";
			a+="|&"+(i/10)+"&|&";
			for(var j=0;j<10;j++)
			{
				a+=(Math.round(that.table[(i*10)+j]*1e4)/1e4).toString().rPad(6, '0')+"&";
				if(j%3==0) a+="|&";
			}
			for(j=1;j<10;j++)
			{
				a+=Math.round(that.charac[(i*10)+j]*1e3)+"&";
				if(j%3==0) a+="|&";
			}
			a+="\\\\";
		}
		a+="|&-&|&-&-&-&-&-&-&-&-&-&-&-&-&-&|&-&-&-&&-&-&-&&-&-&-&|\\\\";
		a+="\\end{array}";
		return(a);
	};
	that.writehtml=function(open, close) // somewhat nicer HTML, but still quite a lot of it
	{
		if(!that.ready)
			return("<strong>Table not populated!</strong>");
		var a="<table border=1 cellpadding=0 cellspacing=0>";
		a+="<tr><td>"+open+"z"+close+"</td><td width=3></td>";
		for(var i=0;i<10;i++)
			a+="<td>"+(i%3?"":"<strong>")+open+i+(i%3?"":"</strong>")+close+"</td>";
		a+="<td width=5></td>";
		for(i=1;i<10;i++)
			a+="<td>"+(i%2?"":"<strong>")+open+i+(i%2?"":"</strong>")+close+"</td>";
		a+="</tr><tr><td>"+open+"<font color=\"white\">0.0-</font>"+close+"</td><td></td>";
		for(i=0;i<10;i++)
			a+="<td>"+open+"<font color=\"white\">0.0000-</font>"+close+"</td>";
		a+="<td></td>";
		for(i=1;i<10;i++)
			a+="<td>"+open+"<font color=\""+(i==5?"black":"white")+"\">ADD</font>"+close+"</td>";
		a+="</tr>";
		for(i=0;i<30;i++)
		{
			if(i&&((i%5)==0)) a+="<tr height=5><td></td></tr>";
			a+="<tr><td>"+open+Math.floor(i/10)+"."+(i%10)+close+"</td><td></td>";
			for(var j=0;j<10;j++)
			{
				a+="<td>"+open+(j%3?"":"<strong>")+(Math.round(that.table[(i*10)+j]*1e4)/1e4).toString().rPad(6, '0')+(j%3?"":"</strong>")+close+"</td>";
			}
			a+="<td></td>";
			for(j=1;j<10;j++)
			{
				a+="<td>"+open+(j%2?"":"<strong>")+Math.round(that.charac[(i*10)+j]*1e3)+(j%2?"":"</strong>")+close+"</td>";
			}
			a+="</tr>";
		}
		a+="</table>";
		return(a.replace(/&gt;/g, ">").replace(/&lt;/g, "<"));
	};
}

String.prototype.lPad = function (n,c) {var i; var a = this.split(''); for (i = 0; i < n - this.length; i++) {a.unshift (c);}; return a.join('');};
String.prototype.rPad = function (n,c) {var i; var a = this.split(''); for (i = 0; i < n - this.length; i++) {a.push (c);}; return a.join('');};

closure="happy";