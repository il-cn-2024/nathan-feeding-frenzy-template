// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "underwater":
            case "level1":return tiles.createTilemap(hex`10001e00010000000000000000000000000000010100000000000000000000000000000101000000060000000800000000000001010000000000000000000600000000010100000000000600000008000000000101000000080000000000000000000001010000000000000000000000000808010100000000060007000000000000080101000006080000070007000000000001010000000000000000070000000800010100000000000008000000000000000101000000000000000000000000000001010000000006000006000000000000010100000000060000000000000000000101000000000000000000000000000001010800000000000000000006000000010100060000000800000000000000000101000000000606000000000000080001010000000000000000000000000800010100000000060006000000000008000101000000000000000000000000000001010000000000060700000000000000010100080006000000000000000000000101000000070000060800060700000001010000000800060000070000080700010100000000000700000002000008000101000000070000000002050000000001010000000000000205050505040200010105020203020405050505050505040101010101010101010101010101010101`, img`
2222222222222222
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2222222222222222
`, [myTiles.transparency16,sprites.builtin.oceanSand11,myTiles.tile1,sprites.builtin.forestTiles0,sprites.builtin.coral5,sprites.builtin.oceanSand0,myTiles.tile4,myTiles.tile5,myTiles.tile6], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "myTile":
            case "tile1":return tile1;
            case "myTile0":
            case "tile2":return tile2;
            case "myTile1":
            case "tile3":return tile3;
            case "fish1":
            case "tile4":return tile4;
            case "fish":
            case "tile5":return tile5;
            case "fish0":
            case "tile6":return tile6;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
