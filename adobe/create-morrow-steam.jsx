/*
 Morrow / Adobe After Effects editable steam composition generator
 File > Scripts > Run Script File... and select this JSX.
 Creates an editable 240x180, 30fps, 4s comp: "Morrow - Warm Steam - Lottie".
 Export with the Bodymovin/Lottie plugin to public/adobe/steam-loop.json.
 Use shape layers, stroke paths, position/opacity keyframes for vector-friendly export.
*/
(function () {
    app.beginUndoGroup("Morrow: editable steam animation");
    try {
        if (!app.project) app.newProject();
        var comp = app.project.items.addComp("Morrow - Warm Steam - Lottie", 240, 180, 1, 4, 30);
        comp.bgColor = [0.94, 0.88, 0.80];
        var offsets = [[72,24], [112,37], [145,28], [180,52]];
        for (var i = 0; i < offsets.length; i++) {
            var layer = comp.layers.addShape();
            layer.name = "Steam 0" + (i + 1) + " | editable vector path";
            var contents = layer.property("ADBE Root Vectors Group");
            var group = contents.addProperty("ADBE Vector Group");
            group.name = "Warm steam line";
            var inner = group.property("ADBE Vectors Group");
            var path = inner.addProperty("ADBE Vector Shape - Group");
            var shape = new Shape();
            shape.vertices = [[0,80], [10,49], [-1,23], [13,-7]];
            shape.inTangents = [[0,0], [-18,13], [6,10], [-11,19]];
            shape.outTangents = [[12,-11], [-9,-16], [12,-12], [0,0]];
            shape.closed = false;
            path.property("ADBE Vector Shape").setValue(shape);
            var stroke = inner.addProperty("ADBE Vector Graphic - Stroke");
            stroke.property("ADBE Vector Stroke Color").setValue([0.52,0.35,0.25]);
            stroke.property("ADBE Vector Stroke Width").setValue(3 + i * 0.55);
            var transforms = layer.property("ADBE Transform Group");
            var position = transforms.property("ADBE Position");
            var x = offsets[i][0], y = offsets[i][1];
            position.setValueAtTime(0, [x, y+14]);
            position.setValueAtTime(2, [x, y-16]);
            position.setValueAtTime(3.97, [x, y-47]);
            var opacity = transforms.property("ADBE Opacity");
            opacity.setValueAtTime(0, 0);
            opacity.setValueAtTime(1.15, 68);
            opacity.setValueAtTime(2.83, 50);
            opacity.setValueAtTime(3.97, 0);
        }
        comp.openInViewer();
        alert("Morrow steam composition created. Save your .aep, then export this comp as Lottie JSON using Bodymovin.");
    } catch (error) {
        alert("Morrow composition error: " + error.toString());
    }
    app.endUndoGroup();
})();
