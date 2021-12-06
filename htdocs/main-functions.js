//New film section
var newFilmSection = 0;
var newFilmPoster = [];
var newFilmName = [];
var newFilmYearRelease = [];
var newFilmId = [];
//Seri film section
var seriFilmSection = 0;
var seriFilmPoster = [];
var seriFilmName = [];
var seriFilmYearRelease = [];
var seriFilmId = [];
//Cine film section
var cineFilmSection = 0;
var cineFilmPoster = [];
var cineFilmName = [];
var cineFilmYearRelease = [];
var cineFilmId = [];
$(function () {
    $("#footer-navigator").load("footer.html");
});

$(function () {
    $("#nav-bar").load("nav_bar.html");
});

function loadFilmPage(filmName, filmYear, filmCountry, filmType, filmPoster, filmTrailer, filmDes) {
    $(function () {
        $("#main-section").load("film_page.html", function () {
            document.getElementById("film-page-title").innerHTML = filmName;
            document.getElementById("film-page-year-release").innerHTML = filmYear;
            document.getElementById("film-page-country-release").innerHTML = filmCountry;
            document.getElementById("film-page-film-type").innerHTML = filmType;
            document.getElementById("film-page-img").setAttribute("src", filmPoster);
            document.getElementById("film-page-trailer").setAttribute("src", filmTrailer);
            document.getElementById("film-page-description").innerHTML = filmDes;
        });
    });
}

function clickOnPoster(filmId) {
    console.log("filmId clicked : " + filmId);
    $.ajax({
        type: "POST",
        url: "http://localhost/serverside/poster-clicked.php",
        dataType: 'json',
        data: {
            filmid_clicked: filmId,
        },
        success: function (file_content) {
            //Output formatted JSON
            //response - {
            //     'film' : {
            //          [0] :   ['film_id']
            //                  ['year_release']
            //                  ['film_poster_link']
            //                  ...
            //          [1] :   ['film_id']
            //                  ['year_release']
            //                  ['film_poster_link']
            //                  ...
            //          [2] :   ['film_id']
            //                  ['year_release']
            //                  ['film_poster_link']
            //                  ...
            //     }
            //}
            console.log("Success response : " + (file_content[0]['film'][0]['film_poster_link']));
            //Handle name 
            var filmNameFinal = "";
            if (file_content[0]['film'][0]['film_type'] == 1) {
                filmNameFinal = "Филм " + file_content[0]['film'][0]['film_name'];
            } else {
                filmNameFinal = "Сериал " + file_content[0]['film'][0]['film_name'];
            }
            //Handle Types
            var filmTypeFinal = takeFilmType(file_content[0]['film'][0]);
            //Handle description
            var descriptionParts = file_content[0]['film'][0]['description'].split('\n');
            var desFinal = "";
            for (var i = 0; i < descriptionParts.length; i++) {
                desFinal = desFinal + descriptionParts[i] + "<br>";
            }
            loadFilmPage(filmNameFinal,
                'Год выпуска: ' + file_content[0]['film'][0]['year_release'],
                'Производство: ' + file_content[0]['film'][0]['country_release'],
                'Жанры: ' + filmTypeFinal,
                file_content[0]['film'][0]['film_poster_link'],
                file_content[0]['film'][0]['film_url_trailer'],
                desFinal
            );
        },
        error: function (error_text) {
            console.log("Error response : " + JSON.stringify(error_text));
            //showLog('Error in calling file python : ' + JSON.stringify(error_text));// need for use with python
        }

    });
}

function loadNewFilm(section_index, left_right_index) { //1:left click, 2: right click

    if (left_right_index == 2) {
        if (section_index == 1) {
            if (newFilmSection == 2) {
                newFilmSection = 0;
            }
            else {
                newFilmSection++;
            }
        } else if (section_index == 2) {
            if (seriFilmSection == 2) {
                seriFilmSection = 0;
            }
            else {
                seriFilmSection++;
            }
        } else {
            if (cineFilmSection == 2) {
                cineFilmSection = 0;
            }
            else {
                cineFilmSection++;
            }
        }

    } else if (left_right_index == 1) {
        if (section_index == 1) {
            if (newFilmSection == 0) {
                newFilmSection = 2;
            }
            else {
                newFilmSection--;
            }
        } else if (section_index == 2) {
            if (seriFilmSection == 0) {
                seriFilmSection = 2;
            }
            else {
                seriFilmSection--;
            }
        } else {
            if (cineFilmSection == 0) {
                cineFilmSection = 2;
            }
            else {
                cineFilmSection--;
            }
        }

    }

    for (var i = 0; i < 5; i++) {
        var idInteract = "";
        var idTitleInteract = "";
        switch (section_index) {
            case 1: idInteract = "new-"; idTitleInteract = "new-"; break;
            case 2: idInteract = "seri-"; idTitleInteract = "seri-"; break;
            case 3: idInteract = "cine-"; idTitleInteract = "cine-"; break;
        }
        switch (i) {
            case 0: idInteract = idInteract + "film1"; idTitleInteract = idTitleInteract + "film-title1"; break;
            case 1: idInteract = idInteract + "film2"; idTitleInteract = idTitleInteract + "film-title2"; break;
            case 2: idInteract = idInteract + "film3"; idTitleInteract = idTitleInteract + "film-title3"; break;
            case 3: idInteract = idInteract + "film4"; idTitleInteract = idTitleInteract + "film-title4"; break;
            case 4: idInteract = idInteract + "film5"; idTitleInteract = idTitleInteract + "film-title5"; break;
        }
        document.getElementById(idInteract).setAttribute("src", newFilmPoster[5 * (newFilmSection) + i]);
        var valueForOnclick = "clickOnPoster(" + newFilmId[5 * (newFilmSection) + i] + ")";
        document.getElementById(idInteract).setAttribute("onclick", valueForOnclick);
        var titleForPoster = newFilmName[5 * (newFilmSection) + i] + "<br>(" + newFilmYearRelease[5 * (newFilmSection) + i] + ")";
        document.getElementById(idTitleInteract).innerHTML = titleForPoster;
        if (section_index == 1) {
            document.getElementById(idInteract).setAttribute("src", newFilmPoster[5 * (newFilmSection) + i]);
            var valueForOnclick = "clickOnPoster(" + newFilmId[5 * (newFilmSection) + i] + ")";
            document.getElementById(idInteract).setAttribute("onclick", valueForOnclick);
            var titleForPoster = newFilmName[5 * (newFilmSection) + i] + "<br>(" + newFilmYearRelease[5 * (newFilmSection) + i] + ")";
            document.getElementById(idTitleInteract).innerHTML = titleForPoster;
        } else if (section_index == 2) {
            document.getElementById(idInteract).setAttribute("src", seriFilmPoster[5 * (seriFilmSection) + i]);
            var valueForOnclick = "clickOnPoster(" + seriFilmId[5 * (seriFilmSection) + i] + ")";
            document.getElementById(idInteract).setAttribute("onclick", valueForOnclick);
            var titleForPoster = seriFilmName[5 * (seriFilmSection) + i] + "<br>(" + seriFilmYearRelease[5 * (seriFilmSection) + i] + ")";
            document.getElementById(idTitleInteract).innerHTML = titleForPoster;
        } else {
            document.getElementById(idInteract).setAttribute("src", cineFilmPoster[5 * (cineFilmSection) + i]);
            var valueForOnclick = "clickOnPoster(" + cineFilmId[5 * (cineFilmSection) + i] + ")";
            document.getElementById(idInteract).setAttribute("onclick", valueForOnclick);
            var titleForPoster = cineFilmName[5 * (cineFilmSection) + i] + "<br>(" + cineFilmYearRelease[5 * (cineFilmSection) + i] + ")";
            document.getElementById(idTitleInteract).innerHTML = titleForPoster;
        }

    }
    console.log('new film section : ' + newFilmSection);

}


function callBackEndForLoadInMain(inputConmmand) {
    $.ajax({
        type: "POST",
        url: "http://localhost/serverside/onload-page.php",
        dataType: 'json',
        data: {
            loadcommand: inputConmmand,
        },
        success: function (file_content) {
            //Output formatted JSON
            //response - {
            //     'film' : {
            //          [0] :   ['film_id']
            //                  ['year_release']
            //                  ['film_poster_link']
            //                  ...
            //          [1] :   ['film_id']
            //                  ['year_release']
            //                  ['film_poster_link']
            //                  ...
            //          [2] :   ['film_id']
            //                  ['year_release']
            //                  ['film_poster_link']
            //                  ...
            //     }
            //}
            console.log("Success response : " + (file_content[0]['film'][0]['film_poster_link']));
            if (inputConmmand == 1) {
                for (var i = 0; i < file_content[0]['film'].length; i++) {
                    newFilmPoster.push(file_content[0]['film'][i]['film_poster_link']);
                    newFilmName.push(file_content[0]['film'][i]['film_name']);
                    newFilmYearRelease.push(file_content[0]['film'][i]['year_release']);
                    newFilmId.push(file_content[0]['film'][i]['film_id']);
                }
                console.log("add img success in new : " + newFilmPoster.length);
            } else if (inputConmmand == 2) {
                for (var i = 0; i < file_content[0]['film'].length; i++) {
                    seriFilmPoster.push(file_content[0]['film'][i]['film_poster_link']);
                    seriFilmName.push(file_content[0]['film'][i]['film_name']);
                    seriFilmYearRelease.push(file_content[0]['film'][i]['year_release']);
                    seriFilmId.push(file_content[0]['film'][i]['film_id']);
                }
                console.log("add img success in seri : " + seriFilmPoster.length);
            } else if (inputConmmand == 3) {
                for (var i = 0; i < file_content[0]['film'].length; i++) {
                    cineFilmPoster.push(file_content[0]['film'][i]['film_poster_link']);
                    cineFilmName.push(file_content[0]['film'][i]['film_name']);
                    cineFilmYearRelease.push(file_content[0]['film'][i]['year_release']);
                    cineFilmId.push(file_content[0]['film'][i]['film_id']);
                }
                console.log("add img success in cine : " + cineFilmPoster.length);
            }
            loadNewFilm(inputConmmand, 0);

        },
        error: function (error_text) {
            console.log("Error response : " + JSON.stringify(error_text));
            //showLog('Error in calling file python : ' + JSON.stringify(error_text));// need for use with python
        }

    });
}

function onloadPage() {
    console.log("onload index.html");
    callBackEndForLoadInMain(1);
    callBackEndForLoadInMain(2);
    callBackEndForLoadInMain(3);
}

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function loadFilmTypePage(directionTypeShowing, file_content, filmFoundfIndex) { //filmFoundIndex : 1-film found, 0-no film found
    console.log("In load film type page");
    $(function () {
        $("#main-section").load("films_type.html", function () {
            $("#film-type-direction").text(directionTypeShowing);
            var textDirection = document.getElementById("film-type-direction");
            setAttributes(textDirection, {
                "style": "font-family: Arial, sans-serif; color:#fff;"
            });
            if (filmFoundfIndex == 1) {
                for (var i = 0; i < file_content[0]['film'].length; i++) {
                    var eventText = "clickOnPoster(" + file_content[0]['film'][i]['film_id'] + ")";
                    var posterLink = file_content[0]['film'][i]['film_poster_link'];
                    var filmNameAdd = file_content[0]['film'][i]['film_name'];
                    var filmYearCountryAdd = file_content[0]['film'][i]['year_release'] + ", " + file_content[0]['film'][i]['country_release'];
                    var filmTypeAdd = takeFilmType(file_content[0]['film'][i]);
                    //Create Container
                    var filmContainerCreated = document.createElement("div");
                    setAttributes(filmContainerCreated, {
                        "class": "films-type-item",
                        "onclick": eventText
                    });
                    //Create <img> tag
                    var filmPosterCreated = document.createElement("img");
                    filmContainerCreated.appendChild(filmPosterCreated);//Add img inside <div>
                    setAttributes(filmPosterCreated, {
                        "class": "films-type-poster",
                        "src": posterLink,
                        "alt": "Describe Image"
                    });
                    //Create container for texts
                    //biggest <div> tag
                    var filmTitleContainerCreated = document.createElement("div");
                    filmTitleContainerCreated.setAttribute("class", "films-type-title");
                    //Second <div> tag
                    var filmTextsOnPoster = document.createElement("div");
                    filmTextsOnPoster.setAttribute("class", "films-type-text-container-onposter");
                    //Text childs
                    //film name
                    var filmName = document.createElement("p");
                    filmName.innerText = filmNameAdd;
                    filmName.setAttribute("class", "films-type-name");
                    filmTextsOnPoster.appendChild(filmName);//Add film name inside second <div> tag
                    //film year, country release 
                    var filmYearCountry = document.createElement("p");
                    filmYearCountry.innerText = filmYearCountryAdd;
                    filmYearCountry.setAttribute("class", "films-type-year-country-release");
                    filmTextsOnPoster.appendChild(filmYearCountry);//Add film year country inside second <div> tag
                    // film type
                    var filmType = document.createElement("p");
                    filmType.innerText = filmTypeAdd;
                    filmType.setAttribute("class", "films-type-type");
                    filmTextsOnPoster.appendChild(filmType);//Add film type inside second <div> tag

                    //Add second <div> tag inside biggest <div> tag
                    filmTitleContainerCreated.appendChild(filmTextsOnPoster);
                    //Add Biggest <div> tag inside film filmContainerCreated
                    filmContainerCreated.appendChild(filmTitleContainerCreated);

                    //Through the filmContainerCreated inside film-page-container
                    var filmsTypePage = document.getElementById("film-page-container");
                    filmsTypePage.appendChild(filmContainerCreated);
                }
            } else {
                var warningNoFilm = document.createElement("h3");
                warningNoFilm.innerText = "В этой категории нет фильмов.";
                setAttributes(
                    warningNoFilm, {
                    "style": "font-family:arial,sans-serif; color:#fff;"
                }
                );
                var filmsTypePage = document.getElementById("film-page-container");
                filmsTypePage.appendChild(warningNoFilm);
            }

        });
    });
}

function takeFilmType(file_content) {
    var filmTypeFinal = "";
    var counterTypes = 0;
    for (var i = 0; i < 15; i++) {
        var type = "";
        var filmTypeShow = "";
        switch (i) {
            case 0: type = "film_action"; filmTypeShow = "Боевики"; break;
            case 1: type = "film_drama"; filmTypeShow = "Драмы"; break;
            case 2: type = "film_horror"; filmTypeShow = "Ужасы"; break;
            case 3: type = "film_detective"; filmTypeShow = "Детективы"; break;
            case 4: type = "film_fantasy"; filmTypeShow = "Фантастика"; break;
            case 5: type = "film_criminal"; filmTypeShow = "Криминальные"; break;
            case 6: type = "film_comedy"; filmTypeShow = "Комедии"; break;
            case 7: type = "film_romantic"; filmTypeShow = "Мелодрамы"; break;
            case 8: type = "film_war"; filmTypeShow = "Военные"; break;
            case 9: type = "film_biography"; filmTypeShow = "Биографические"; break;
            case 10: type = "film_historical"; filmTypeShow = "Исторические"; break;
            case 11: type = "film_medical"; filmTypeShow = "Медицинские"; break;
            case 12: type = "film_musical"; filmTypeShow = "Музыкальные"; break;
            case 13: type = "film_thriller"; filmTypeShow = "Триллеры"; break;
            case 14: type = "film_familiar"; filmTypeShow = "Семейные"; break;
        }
        if (file_content[type] == 1) {
            if (counterTypes == 0) {
                filmTypeFinal = filmTypeFinal + filmTypeShow;
            } else {
                filmTypeFinal = filmTypeFinal + ', ' + filmTypeShow;
            }
            counterTypes++;
        }
    }
    return filmTypeFinal;
}

function callBackEndForLoadInType(filmOrSerial, typeFilm) {
    $.ajax({
        type: "POST",
        url: "http://localhost/serverside/load-film-type.php",
        dataType: 'json',
        data: {
            filmorserial: filmOrSerial, //1:film, 2:serial
            typefilm: typeFilm,
        },
        success: function (file_content) {
            //Output formatted JSON
            //response - {
            //     'film' : {
            //          [0] :   ['film_id']
            //                  ['year_release']
            //                  ['film_poster_link']
            //                  ...
            //          [1] :   ['film_id']
            //                  ['year_release']
            //                  ['film_poster_link']
            //                  ...
            //          [2] :   ['film_id']
            //                  ['year_release']
            //                  ['film_poster_link']
            //                  ...
            //     }
            //}

            var filmOrSerialText = "";
            var filmTypeText = "";
            if (filmOrSerial == 1) {
                filmOrSerialText = "Филиы";
            } else if (filmOrSerial == 2) {
                filmOrSerialText = "Сериалы";
            }

            switch (typeFilm) {
                case 1: filmTypeText = "Боевики"; break;
                case 2: filmTypeText = "Драмы"; break;
                case 3: filmTypeText = "Ужасы"; break;
                case 4: filmTypeText = "Детективы"; break;
                case 5: filmTypeText = "Фантастика"; break;
                case 6: filmTypeText = "Криминальные"; break;
                case 7: filmTypeText = "Комедии"; break;
                case 8: filmTypeText = "Мелодрамы"; break;
                case 9: filmTypeText = "Военные"; break;
                case 10: filmTypeText = "Биографические"; break;
                case 11: filmTypeText = "Исторические"; break;
                case 12: filmTypeText = "Медицинские"; break;
                case 13: filmTypeText = "Музыкальные"; break;
                case 14: filmTypeText = "Триллеры"; break;
                case 15: filmTypeText = "Семейные"; break;
            }

            var directionTypeShowing = filmOrSerialText + "/ " + filmTypeText;
            if (file_content[0]['film'].length > 0) {
                console.log("Success response : " + (file_content[0]['film'][0]['film_poster_link']));
                if (filmOrSerial == 0) {
                    directionTypeShowing = "Все";
                }
                console.log("directionTypeShowing : " + directionTypeShowing);
                loadFilmTypePage(directionTypeShowing, file_content, 1);
            } else {
                console.log("Success response : no film found");
                loadFilmTypePage(directionTypeShowing, null, 0);
            }

        },
        error: function (error_text) {
            console.log("Error response : " + JSON.stringify(error_text));
            //showLog('Error in calling file python : ' + JSON.stringify(error_text));// need for use with python
        }

    });
}

function createSearchResult(file_content) {
    for (var i = 0; i < file_content[0]['film'].length; i++) {
        //create onclick eventText
        var eventOnclick = "clickOnPoster(" + file_content[0]['film'][i]['film_id'] + ")";

        //create line in ul
        var searchResultLineCreate = document.createElement("li");
        setAttributes(searchResultLineCreate, {
            "class": "film-found",
            "onclick": eventOnclick
        });

        //Create poster 
        var searchResultPoster = document.createElement("img");
        setAttributes(searchResultPoster, {
            "class": "film-found-poster",
            "src": file_content[0]['film'][i]['film_poster_link'],
            "alt": "Film found"
        });
        searchResultLineCreate.appendChild(searchResultPoster);//Add poster inside line

        //Create title 
        var searchResultTitleCombined = file_content[0]['film'][i]['film_name'] + "(" + file_content[0]['film'][i]['year_release'] + ")";
        var searchResultTitle = document.createElement("p");
        searchResultTitle.setAttribute("class", "film-found-title");
        searchResultTitle.innerText = searchResultTitleCombined;
        searchResultLineCreate.appendChild(searchResultTitle);//Add title inside line

        //add line into Container
        var searchResultContainer = document.getElementById("search-film-for-show-found-element");
        searchResultContainer.appendChild(searchResultLineCreate);
    }
}

function clearSearchResultDropList() {
    var ele = document.getElementById("search-film-for-show-found-element");
    ele.innerHTML = '';
}

function searchFunction() {
    clearSearchResultDropList();
    var searching = document.getElementById("search-blank").value.toUpperCase();
    console.log("Search function called VALUE : " + searching);
    if (searching != '') {
        $.ajax({
            type: "POST",
            url: "http://localhost/serverside/on-searching.php",
            dataType: 'json',
            data: {
                datasearching: searching,
            },
            success: function (file_content) {
                //Output formatted JSON
                //response - {
                //     'film' : {
                //          [0] :   ['film_id']
                //                  ['year_release']
                //                  ['film_poster_link']
                //                  ...
                //          [1] :   ['film_id']
                //                  ['year_release']
                //                  ['film_poster_link']
                //                  ...
                //          [2] :   ['film_id']
                //                  ['year_release']
                //                  ['film_poster_link']
                //                  ...
                //     }
                //}

                console.log("number film found : " + file_content[0]['film'].length);
                createSearchResult(file_content);
            },
            error: function (error_text) {
                console.log("Error response : " + JSON.stringify(error_text));
                //showLog('Error in calling file python : ' + JSON.stringify(error_text));// need for use with python
            }

        });
    }

}
