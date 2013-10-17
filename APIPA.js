/*
* APIPA 0.1
* https://github.com/yeosblue/APIPA-Bookmarklet
*
* Copyright 2013, Tau-Heng Yeo
* yeosblue(at)gmail.com
*
* Licensed under the GPLv2 license
*
*/

var old_processKeywords = processKeywords;
var old_backToInnerSearch = backToInnerSearch;
var old_toggleQueryForm = toggleQueryForm;

/* override */
var processKeywords = function() {

	var keywordStr = "";
	//Inner search keywords
	if(document.form1.searchFlag.value=='i'){
		keywordStr = processInnerSearchKeywords();
	// Outter search keywords
	}else if(document.form1.searchFlag.value=='o'){
		var source = document.form1.outSearchSource.value;
		if(source === 'WIPO'){
			keywordStr = processWIPOKeywords();
		}else if(source === 'EPO'){
			keywordStr = processEPOKeywords();
		}else if(source === 'PAJ'){
			keywordStr = processPAJKeywords();
		}
	}
	document.form1.keywords.value = keywordStr;
};

var backToInnerSearch = function() {
	var webF = document.getElementById('oQueryForm');
	var webFOption = document.getElementById('oQueryOption');
	var apipaF = document.getElementById('iQueryForm');

	webF.style.display = "none"; webFOption.style.display = "none";
	document.form1.searchFlag.value = "i";
	
	for(i=0;i<document.form1.source.length;i++){
		document.form1.source[i].checked = false;
	}
	
	var showInnerForm = false;
	for(i=0;i<document.form1.innerSource.length;i++){
		if(document.form1.innerSource[i].checked){
			showInnerForm = true;
			break;
		}
	}
	if(showInnerForm)
		apipaF.style.display = "block";
	else
		apipaF.style.display = "none";	
	
	if (document.getElementById("_us").checked) {
		document.getElementById("pub1").value="$IsuNo";
		document.getElementById("pub2").value="$IsuNo";
	}
	else {
		document.getElementById("pub1").value="$PubNo";
		document.getElementById("pub2").value="$PubNo";			
	}
}

var toggleQueryForm = function () {

	var webF = document.getElementById('oQueryForm');
	var webFOption = document.getElementById('oQueryOption');
	var apipaF = document.getElementById('iQueryForm');
	
	webF.style.display = "block";
	webFOption.style.display = "block";
	apipaF.style.display = "none";
	
	document.form1.searchFlag.value = "o";
	for(i=0;i<document.form1.innerSource.length;i++){
		document.form1.innerSource[i].checked = false;
	}

	var sourceName;
	var queryFormURI;
	var sourceObj = document.form1.source;
	for(i=0;i<sourceObj.length;i++){
		if(sourceObj[i].checked){
			sourceName = sourceObj[i].value;
		}
	}
	document.form1.outSearchSource.value = sourceName;

	if(document.form1.queryOption[0].checked){
		queryFormURI = 'portfolio/queryForms/' + sourceName + '_1.htm'
		document.form1.outSearchForm.value = "1";
	}else{
		queryFormURI = 'portfolio/queryForms/' + sourceName + '_2.htm'
		document.form1.outSearchForm.value = "2";		
	}

	loadURI(queryFormURI,divContentChangeHandler);
}

