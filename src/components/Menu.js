import React, {Component} from "react";
import AlbumSelect from "./AlbumSelect";
import ShapeSelect from "./ShapeSelect";

export class Menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="menu">
                <h1>Music Collage</h1>
                <AlbumSelect />
                <ShapeSelect />
                <button className="submit-btn">Collage-ify</button>
            </div>
        )
    }
}

export default Menu;