$(document).ready(function () {
    var i;
    var quiz = [];
    var Count;
    var imageChoice;
    var correct = 0;
    var missed = 0;
    var attempted = 0;
    var rightAns;
    var intervalTimer;
    var delayButtonAlert;
    var newQuest;
    var ansAttempt;

    temizle();
    quizBuild();

    i = 1;

    hideStuff();
    $("#new-question").on("click", displayNewQuestion);
    $("#new-question").on("click", displayStats);
    $("#new-question").on("click", imageInsert);

    function temizle() {
        document.getElementById("cont").style.visibility = "hidden";
    }
    function displayNewQuestion() {

        document.getElementById("cont").style.visibility = "visible";

        if (i > 0) {
            clearTimeout(newQuest);
        }

        $("#new-question").hide();
        videoInsert()
        imageInsert();
        hideStuff();


        ansAttempt = false;
        quizWrite();

        Count = 10;
        intervalTimer = setInterval(countDown, 1000)

        delayButtonAlert = setTimeout(notAttempted, 10000)
        clearButton();


    }
    $(document).on("click", ".answer", Attempted);

    function countDown() {
        Count -= 1;
        $("#seconds-count").html('<h3> ' + Count + " Seconds Left </h3> ")
        return Count;
    }
    function hideStuff() {
        $("#message").hide();
        $("#picture").hide();
        $("#reveal").hide();
    }
    function Attempted() {

        clearTimeout(delayButtonAlert);
        clearTimeout(intervalTimer);

        ansAttempt = true;
        $("#message").show();

        userChoice = parseInt($(this).val());
        console.log(userChoice, i);

        attempted += 1;

        if (userChoice == quiz[i].ans) {

            $("#message").html('Correct!');
            correct += 1;
        }
        else {
            $("#message").html('Wrong!');
            missed += 1;
        }

        $(".stats").show();
        displayStats();

        displayAnsImg();
    }
    function notAttempted() {

        if (ansAttempt != true) {

            clearTimeout(delayButtonAlert);
            clearTimeout(intervalTimer);

            missed += 1;
            attempted += 1;
            $(".stats").show();
            displayStats();

            displayAnsImg();
        }
        else {
            return
        }
    }
    function displayAnsImg() {

        if (i < quiz.length) {

            newQuest = setTimeout(displayNewQuestion, 2000);
            $("video").remove();

        }

        imageChoice = imageInsert();
        $("#picture").html(imageChoice);
        $("#reveal").html("Correct Answer : " + quizAnswer());

        $("#picture").show();
        $("#reveal").show();

        i++;
    }
    function quizConstructor(question, answ1, answ2, answ3, answ4, ans, imageURL, attempted, videoURL) {
        this.question = question;
        this.answ1 = answ1;
        this.answ2 = answ2;
        this.answ3 = answ3;
        this.answ4 = answ4;
        this.ans = ans;
        this.imageURL = imageURL;
        this.attempted = attempted;
        this.videoURL = videoURL;
    }
    function quizBuild() {
        quiz[1] = new quizConstructor('The Witcher 3: Wild Hunt Hangi yılda yayınlanmıştır ? ', '2013', '2014', '2015', '2016', 3, "pics/witcher.webp", false);
        quiz[2] = new quizConstructor('2012 Yılında 1 USD kaç YTL ediyordu ? ', '1,8 YTL', '2,1 YTL', '8,7 YTL', '1,6 YTL', 1, "pics/usd.jpeg", false,);
        quiz[3] = new quizConstructor('Dance Dance şarksını seslendiren bu grup kimdir ? ', 'AC/DC ', 'Linkin Park', 'Fall Out Boy', 'The Killers', 3, "", false, "pics/dance.mp4");
        quiz[4] = new quizConstructor('2010 yılında Eurovision şarkısı olarak We Could Be The Same`i söyleyen hakkı yenen grubumuzun adı nedir ?', 'Mor ve Ötesi', 'Gripin', '  84  ', 'MaNga', 4, "", false, "pics/we.mov");
        quiz[5] = new quizConstructor();
        return quiz
    }

    function clearButton() {
        $("#answer-1").css("background-color", "#445ac5");
        $("#answer-2").css("background-color", "#445ac5");
        $("#answer-3").css("background-color", "#445ac5");
        $("#answer-4").css("background-color", "#445ac5");
        $("#answer-5").css("background-color", "#445ac5");
    }
    function quizWrite() {
        $("#question").html("" + quiz[i].question + " ?");

        console.log(quiz[i].videoURL);
        if (quiz[i].videoURL == null) {
            imageChoice = imageInsert();
            $("#picture").show();
            $("#picture").html(imageChoice);
        }
        else {
            imageChoice = videoInsert();
            $("#video").show();
            $("#video").html(imageChoice);
        }
        if (i == 5) {
            var x = document.getElementById("cont");
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }

            var x = document.getElementById("seconds-count");
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
            alert("Game Over!\n" + "Correct Number : " + correct + "\nWrong Number : " + missed);
            location.reload();
        }
        $("#answer-1").html(quiz[i].answ1);
        $("#answer-2").html(quiz[i].answ2);
        $("#answer-3").html(quiz[i].answ3);
        $("#answer-4").html(quiz[i].answ4);

    }
    function quizAnswer() {
        if (quiz[i].ans == 1) {
            quizAns = quiz[i].answ1;
        } else if (quiz[i].ans == 2) {
            quizAns = quiz[i].answ2;
        } else if (quiz[i].ans == 3) {
            quizAns = quiz[i].answ3;
        } if (quiz[i].ans == 4) {
            quizAns = quiz[i].answ4;
        }
        if (1 == quiz[i].ans) {
            $("#answer-1").css("background-color", "green");
            $("#answer-2").css("background-color", "red");
            $("#answer-3").css("background-color", "red");
            $("#answer-4").css("background-color", "red");
        }
        if (2 == quiz[i].ans) {
            $("#answer-1").css("background-color", "red");
            $("#answer-2").css("background-color", "green");
            $("#answer-3").css("background-color", "red");
            $("#answer-4").css("background-color", "red");
        }
        if (3 == quiz[i].ans) {
            $("#answer-1").css("background-color", "red");
            $("#answer-2").css("background-color", "red");
            $("#answer-3").css("background-color", "green");
            $("#answer-4").css("background-color", "red");
        }
        if (4 == quiz[i].ans) {
            $("#answer-1").css("background-color", "red");
            $("#answer-2").css("background-color", "red");
            $("#answer-3").css("background-color", "red");
            $("#answer-4").css("background-color", "green");
        }
        return quizAns;
    }
    function displayStats() {
        $(".stats").html("<h4> Correct Answers : " + correct + '<br>' + "Wrong Answers : " + missed + '<br>' + "Number of Questions : " + attempted + '</h4>');
    }
    function imageInsert() {
        var imageChoice = $('<img>');
        imageChoice.attr('src', quiz[i].imageURL);
        imageChoice.attr('width', '500px');
        return imageChoice;
    }
    function videoInsert() {
        var imageChoice = $('<video>');
        imageChoice.attr("controls", "controls");
        imageChoice.html('<source src=' + quiz[i].videoURL + ' type=\'video/mp4\'>');
        imageChoice.attr('width', '500px');
        return imageChoice;
    }
})