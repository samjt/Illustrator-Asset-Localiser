# Illustrator-Asset-Localiser
Iterate through Datasets with localised text in them and output artboard assets that have been tagged to be localised.

## How-To:
1. Put your localised text into a CSV file so that each line represents a language, with one column the language identifier, e.g. `en-US` and another column the localised text.
2. Import your variables into Illustrator using Vasily Hall's [Variable Importer](https://github.com/Silly-V/Adobe-Illustrator/blob/master/Variable%20Importer/VariableImporter.jsx).
3. Set the Dataset names to be the language identifier and bind the localised text to the text fields it should appear in.
2. Each artboard that contains localised text should have the keyword `i18n` in it's name, artboards that should be excluded should start with `-`
3. Set a default Font and any fallback fonts required for different languages. The default font is specified in the `default` case in the switch statement. Alternate language fonts are set using the language identifier.
e.g.
 `case "zh-TW":
          doc.textFrames[q].textRange.characterAttributes.textFont = app.textFonts.getByName("Meiryo-Bold");`

Sets the font for Taiwanese to Meiryo Bold.

4. Run the script, a folder named `Assets _current date_` will be created in the same folder as the illustrator file. Each language will have it's own subfolder, any artboards that did not require localisation will be exported at the top level.
