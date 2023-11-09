// Declare form of HTML to enable element inside of it
const form = document.querySelector('.form')

let weightInput = form.querySelector('[name=weight')
let heightInput = form.querySelector('[name=height')
let ageInput = form.querySelector('[name=age')

// When button click, trigger confirmation dialog and function validateForm()
form.addEventListener("submit", function(event) {
    event.preventDefault();
    Swal.fire({
        title: 'Apa Anda Yakin?',
        text: "Menghitung BMI dengan data berikut?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FA7070',
        cancelButtonColor: '#557C55',
        confirmButtonText: 'Calculate'
      }).then((result) => {
        if (result.isConfirmed) {
            validateForm();
        }
      });
});

// Validate form input using sweet alert for styling
function validateForm() {
    let weight = parseFloat(weightInput.value)
    let height = parseFloat(heightInput.value)
    let age = parseFloat(ageInput.value)

    if (isNaN(weight) || weight < 0 || weight > 200) {
        Swal.fire(
            'Oops!',
            'Please enter a valid weight',
            'warning'
        );
    } else if (isNaN(height) || height < 0 || height > 300) {
        Swal.fire(
            'Oops!',
            'Please enter a valid height',
            'warning'
        );
    } else if (isNaN(age) || age < 0 || age > 150) {
        Swal.fire(
            'Oops!',
            'Please enter a valid age',
            'warning'
        );
    } else {
        calculateBMI()
    }
}

function calculateBMI() {
    // Convert string into a floating number
    let weight = parseFloat(weightInput.value)
    let height = parseFloat(heightInput.value)

    // Calculate BMI
    let bmi = weight / Math.pow(height / 100, 2);

    // BMI result selection
    if (bmi < 18.5) {
        category = 'Kurus';
        explanation = "Jika BMI Anda di bawah 18,5, Anda dianggap kurus. Ini mungkin menandakan bahwa Anda memiliki kurangnya lemak tubuh dan mungkin menghadapi risiko kesehatan lainnya."
        tips = "Health tips:<br>- Pertahankan diet seimbang yang mencakup makanan bergizi. <br>- Latihan fisik untuk memperkuat otot dan meningkatkan kebugaran. <br>- Konsultasikan dengan profesional kesehatan untuk mengatasi masalah kesehatan yang mungkin terkait dengan berat badan rendah."
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = 'Normal';
        explanation = "Rentang BMI ini dianggap sebagai berat badan normal yang sehat. Ini adalah kategori yang diinginkan."
        tips = "Health tips:<br>- Pertahankan pola makan seimbang yang mencakup berbagai nutrisi. <br>- Lakukan aktivitas fisik secara teratur untuk menjaga kebugaran dan kesehatan. <br>- Tetap awasi berat badan Anda untuk mencegah peningkatan berlebih."
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = 'Kelebihan Berat Badan';
        explanation = "Jika BMI Anda berada di kisaran ini, Anda dianggap memiliki kelebihan berat badan. Ini dapat meningkatkan risiko penyakit terkait obesitas."
        tips = "Health tips:<br>- Kurangi asupan kalori dan pilih makanan sehat. <br>- Tingkatkan aktivitas fisik dan latihan rutin. <br>- Konsultasikan dengan ahli gizi atau profesional kesehatan untuk membuat rencana penurunan berat badan yang tepat."
    } else {
        category = 'Obesitas';
        explanation = "besitas adalah kondisi di mana tubuh memiliki jumlah lemak berlebih yang dapat menyebabkan berbagai masalah kesehatan serius, termasuk diabetes, penyakit jantung."
        tips = "Health tips:<br> - Konsultasikan dengan profesional medis untuk rencana penurunan berat badan yang aman dan efektif. <br>-Terapkan perubahan gaya hidup yang berkelanjutan, termasuk diet sehat dan aktivitas fisik yang konsisten. <br>-Dukungan psikologis dan dukungan sosial dapat membantu mengatasi tantangan dalam penurunan berat badan."
    }

    // Get the result element
    let bmiCategory1 = document.querySelector('#bmi-category-1')
    let bmiCategory2 = document.querySelector('#bmi-category-2')
    let bmiCategory3 = document.querySelector('#bmi-category-3')
    let bmiCategory4 = document.querySelector('#bmi-category-4')
    let bmiCategory5 = document.querySelector('#bmi-category-5')
    let bmiCategory6 = document.querySelector('#bmi-category-6')

    let bmiResult = document.querySelector('#bmi-result');

    // Round the result to two decimal places
    let roundedBmi = bmi.toFixed(2);

    // Display the result on the web page
    bmiCategory1.textContent = `${category}`
    bmiResult.textContent = `BMI = ${roundedBmi}`
    bmiCategory2.textContent = `Your category is ${category}`
    bmiCategory3.textContent = `${explanation}`
    bmiCategory4.innerHTML = `${tips}`;

    // Display or hide the results page
    document.getElementById("results").style.display = "block";
    document.getElementById("calculator").style.display = "none";
    if (bmi < 30) {
        document.getElementById("obese-only").style.display = "none";
    } else {
        document.getElementById("obese-only").style.display = "block";
    }
}