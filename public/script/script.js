const selectImage = document.querySelector('.select-image');
const inputFile = document.querySelector('#file');
const imgArea = document.querySelector('.img-area');

selectImage.addEventListener('click', function () {
	inputFile.click();
})

inputFile.addEventListener('change', function () {
	const image = this.files[0]
	if(image.size < 2000000) {
		const reader = new FileReader();
		reader.onload = ()=> {
			const allImg = imgArea.querySelectorAll('img');
			allImg.forEach(item=> item.remove());
			const imgUrl = reader.result;
			const img = document.createElement('img');
			img.src = imgUrl;
			imgArea.appendChild(img);
			imgArea.classList.add('active');
			imgArea.dataset.img = image.name;
		}
		reader.readAsDataURL(image);
	} else {
		alert("Image size more than 2MB");
	}
});









const fileInput = document.getElementById('fileInput');
		const container = document.getElementById('container');
		const nameInput = document.getElementById('nameInput');
		const priceInput = document.getElementById('priceInput');
		const descriptionTextarea = document.getElementById('descriptionTextarea');
	
		container.addEventListener('click', function() {
		  fileInput.click();
		});
	
		fileInput.addEventListener('change', function() {
		  const file = fileInput.files[0];
		  const reader = new FileReader();
	
		  reader.onload = function(e) {
			const image = new Image();
			image.src = e.target.result;
	
			image.onload = function() {
			  container.innerHTML = '';
			  container.appendChild(image);
			};
		  };
	
		  reader.readAsDataURL(file);
		});
	
		nameInput.addEventListener('focus', function() {
		  nameInput.style.borderColor = '#333';
		});
	
		/*descriptionTextarea.addEventListener('focus', function() {
		  descriptionTextarea.style.borderColor = '#333';
		});*/
	
	
	
		
	
	const remainingPriceElement = document.getElementById('remainingPrice');
	
	priceInput.addEventListener('input', function() {
	  const enteredPrice = priceInput.value.trim();
	  
	  if (enteredPrice === '') {
		remainingPriceElement.textContent = '';
	  } else {
		const parsedPrice = parseFloat(enteredPrice);
	
		if (isNaN(parsedPrice)) {
		  remainingPriceElement.textContent = '';
		} else {
		  const calculatedPrice = parsedPrice * (1 - 0.15);
		  const formattedPrice = calculatedPrice.toFixed(2);
		  remainingPriceElement.textContent = `With our margin, the final revenue is $${formattedPrice}`;
		}
	  }
	});
	
	function toggleBold() {
		var textarea = document.getElementById("descriptionTextarea");
		textarea.style.fontWeight = textarea.style.fontWeight === "bold" ? "normal" : "bold";
	}
	
	function toggleItalic() {
		var textarea = document.getElementById("descriptionTextarea");
		textarea.style.fontStyle = textarea.style.fontStyle === "italic" ? "normal" : "italic";
	}
	
	function toggleParagraph() {
		var textarea = document.getElementById("descriptionTextarea");
		textarea.value += "\n\n";
	}
	
	function toggleBulletList() {
		var textarea = document.getElementById("descriptionTextarea");
		textarea.value += "• ";
	}
	
	function toggleNumberList() {
		var textarea = document.getElementById("descriptionTextarea");
		var lines = textarea.value.split("\n");
	
		for (var i = 0; i < lines.length; i++) {
			lines[i] = (i + 1) + ". " + lines[i];
		}
	
		textarea.value = lines.join("\n");
	}
	
	function copyText() {
		var textarea = document.getElementById("descriptionTextarea");
		textarea.select();
		document.execCommand("copy");
	}
