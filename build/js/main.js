$.material.init();
(function() {
  var colors = {}, main = {};
  $(".color-group").each(function() {
    var color = $(this).find(".name").text().trim().toLowerCase().replace(" ", "-");
    colors[color] = {};

    $(this).find(".color").not(".main-color").each(function() {
      var shade = $(this).find(".shade").text().trim(),
          hex   = $(this).find(".hex").text().trim();

      colors[color][shade] = hex;
    });
    main[color] = color + "-" + $(this).find(".main-color .shade").text().trim();

  });
  var LESS = "";
  $.each(colors, function(name, shades) {
    LESS += "\n\n";
    $.each(shades, function(shade, hex) {
      LESS += "@" + name + "-" + shade + ": " + hex + ";\n";
    });
    if (main[name]) {
      LESS += "@" + name + ": " + main[name] + ";\n";
    }
  });
  console.log(LESS);
})();