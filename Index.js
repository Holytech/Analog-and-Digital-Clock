var canvas, clockwidth, centerX, centerY, clock;

		function setupAnalogClock(cw){
			canvas = document.getElementById("analog-clock");
			clock = canvas.getContext("2d");
			clockwidth = cw;
			centerX = canvas.width / 2;
			centerY = canvas.height / 2;

			tick();
			window.setInterval(tick, 1000);
		}

		function tick(){
			var date = new Date();
			clock.clearRect(0,0,canvas.width, canvas.height);

			drawStaticElts();

			document.getElementById("date").innerHTML = date.toDateString();
			document.getElementById("digital-clock").innerHTML = date.toLocaleTimeString();

			var hours = date.getHours();
			clock.strokeStyle = "green";
			clock.lineWidth = 3;
			drawHand(clockwidth / 3, hours * 30);

			var minutes = date.getMinutes();
			clock.strokeStyle = "blue";
			clock.lineWidth = 2;
			drawHand(clockwidth / 3, minutes * 6);

			var seconds = date.getSeconds();
			clock.strokeStyle = "red";
			clock.lineWidth = 1;
			drawHand(clockwidth / 3, seconds * 6);
		}

		function drawStaticElts(){
			clock.beginPath();
			clock.arc(centerX, centerY, clockwidth / 2, 0, 2 * Math.PI, false);
			clock.fillStyle = "rgb(220,220,220)";
			clock.fill();
			clock.strokeStyle = "#66FFCC";
			clock.lineWidth = 4;
			clock.stroke();
			clock.closePath();

			clock.beginPath();
			clock.arc(centerX, centerY, 3, 0, 2 * Math.PI, false);
			clock.fillStyle = "white";
			clock.fill();
			clock.closePath();

			drawNumbers();
		}

		function drawNumbers(){
			var i = 12;
			// clock.strokeStyle = "white";
			// clock.lineWidth = 2;

			while(i>0){
				clock.save();
				clock.beginPath();
				clock.translate(centerX, centerY);
				var angle = (i * 30) * Math.PI / 180;
				clock.rotate(angle);
				clock.translate(0, -clockwidth / 2);

				clock.save();
				clock.translate(0, -10);
				clock.rotate(-angle);

				clock.fillText(i, -3, 0);
				clock.restore();

				clock.moveTo(0,0);
				clock.lineTo(0,10);
				clock.stroke();
				clock.closePath();
				clock.restore();

				i--;
			}
		}

		function drawHand(length, angle){
			clock.save();
			clock.beginPath();
			clock.translate(centerX, centerY);
			clock.rotate(-180 * Math.PI / 180);
			clock.rotate(angle * Math.PI / 180);
			clock.moveTo(0,0);
			clock.lineTo(0, length);
			clock.stroke();
			clock.closePath();
			clock.restore();
		}

		window.onload = function(){
			setupAnalogClock(360);
		}