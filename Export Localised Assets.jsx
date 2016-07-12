﻿#target illustrator/** * * Iterate through artboards, update textfields by switching Dataset and Font, export the artboards as assets. */var doc = app.activeDocument;var today = new Date();/** * Create the Assets export folder based on today's date. */var dest = doc.path + "/Assets " + today.getFullYear() + today.getMonth() + today.getDate() + "/";var destFolder = new Folder(dest);if (!destFolder.exists){    destFolder.create();}/** * Iterate through each dataset, getting the localized information in place for export. */for (var p = doc.dataSets.length - 1; p >= 0; p--) {    // Activate the dataset to make this locale active in all the bound text fields.    doc.dataSets[p].display();    for (var i = doc.artboards.length - 1; i >= 0; i--) {        // Artboards marked with - at the beginning are assumed to not export        if (doc.artboards[i].name.indexOf('-') === 0){            continue;        }        // Activate the Artboard, otherwise it's not set as the export target.        doc.artboards.setActiveArtboardIndex(i);        /**         * If this Artboard contains the tag i18n in it's name, needs to be localised.         */        if (doc.artboards[i].name.indexOf('i18n') != -1){            var myDest;            var currentDataSet = doc.activeDataSet.name;            for (var q = doc.textFrames.length - 1; q >= 0; q--) {                /**                 * Some languages use a different font face, because Circular doesn't render them.                 */                switch(currentDataSet){                    case "ja-JP":                    case "zh-TW":                        doc.textFrames[q].textRange.characterAttributes.textFont = app.textFonts.getByName("Meiryo-Bold");                    break;                    case "el-GR":                        doc.textFrames[q].textRange.characterAttributes.textFont = app.textFonts.getByName("Helvetica-Bold");                    break;                    default:                        doc.textFrames[q].textRange.characterAttributes.textFont = app.textFonts.getByName("CircularSpUI-Bold");                    break;                }            };            /**             * Set the path to be the locale name folder, if it doesn't exist create it.              */            var myLangFolder = new Folder(dest + doc.activeDataSet.name + "/");            if (!myLangFolder.exists){                myLangFolder.create();            }            myDest = dest + doc.activeDataSet.name + "/" + doc.artboards[i].name + ".png";        }else{            myDest = dest + doc.artboards[i].name + ".png";        }        /**         * Export the specific file unless it already exists         */        var fileSpec = new File(myDest);        if (!fileSpec.exists){            var exportOptions = new ExportOptionsPNG24();            exportOptions.antiAliasing = true;            exportOptions.artBoardClipping = true;            exportOptions.transparency = true;            exportOptions.saveAsHTML = false;                        var type = ExportType.PNG24;            app.activeDocument.exportFile( fileSpec, type, exportOptions );        }    };};