import React, {Component} from "react";
import AlbumSelect from "./AlbumSelect";
import ShapeSelect from "./ShapeSelect";

let possibleNums = [2, 4, 5, 6, 7, 8, 9, 10, 13, 14, 16, 17, 18, 20, 22, 24, 25, 26, 28, 30]

let allThirty = [{"artist":"Arctic Monkeys","album":"AM","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/f579e414e20f40969185e41182d72472.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/f579e414e20f40969185e41182d72472.png"},{"artist":"Arctic Monkeys","album":"Whatever People Say I Am, That's What I'm Not","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/053829a0cd6d4d5d95070b1542cb3f96.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/053829a0cd6d4d5d95070b1542cb3f96.png"},{"artist":"Arctic Monkeys","album":"Who the Fuck Are Arctic Monkeys","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/5b50b9087aad45b9ba027580b5ebcd89.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/5b50b9087aad45b9ba027580b5ebcd89.png"},{"artist":"Arctic Monkeys","album":"Cornerstone","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/ee9ea9956abb4885aa1006a2481ca2db.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/ee9ea9956abb4885aa1006a2481ca2db.png"},{"artist":"Arctic Monkeys","album":"Fluorescent Adolescent","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/5d0f664b35a64046c089a8dc6281861b.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/5d0f664b35a64046c089a8dc6281861b.png"},{"artist":"Arctic Monkeys","album":"Favourite Worst Nightmare","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/705f6109de0143da8050188598fd4781.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/705f6109de0143da8050188598fd4781.png"},{"artist":"Arctic Monkeys","album":"Suck It and See","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/e8faaf58a491491ea00e6d3b7ac5d7db.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/e8faaf58a491491ea00e6d3b7ac5d7db.png"},{"artist":"Arctic Monkeys","album":"My Propeller","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/f3b6ddf0b1a9439f8b535166393c7721.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/f3b6ddf0b1a9439f8b535166393c7721.png"},{"artist":"Arctic Monkeys","album":"R U Mine?","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/e0ecda2bcb5e41a4c1fad665b2c060c7.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/e0ecda2bcb5e41a4c1fad665b2c060c7.png"},{"artist":"Arctic Monkeys","album":"Tranquility Base Hotel & Casino","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/c7f6da092ec3fd3bdb02e3ff71c56fea.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/c7f6da092ec3fd3bdb02e3ff71c56fea.png"},{"artist":"Arctic Monkeys","album":"Bigger Boys And Stolen Sweethe","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/68b024614b4640b7bdf495e528dfc463.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/68b024614b4640b7bdf495e528dfc463.png"},{"artist":"Arctic Monkeys","album":"Beneath the Boardwalk","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/cd6735f849c5455c8435f5be13298083.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/cd6735f849c5455c8435f5be13298083.png"},{"artist":"Arctic Monkeys","album":"Why'd You Only Call Me When You're High?","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/29e5fe7cb94f437d9cde85e443c94425.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/29e5fe7cb94f437d9cde85e443c94425.png"},{"artist":"Arctic Monkeys","album":"Do I Wanna Know?","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/12edf61e195044b499f316bf1b54c819.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/12edf61e195044b499f316bf1b54c819.png"},{"artist":"Arctic Monkeys","album":"Humbug","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/70163676ea2e4c44959c3af0f71b30d8.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/70163676ea2e4c44959c3af0f71b30d8.png"},{"artist":"Arctic Monkeys","album":"Black Treacle","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/95bcd5d928004876c877f15274d14afb.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/95bcd5d928004876c877f15274d14afb.png"},{"artist":"Arctic Monkeys","album":"Leave Before the Lights Come On","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/381c036d612c4889a4dc112983de663d.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/381c036d612c4889a4dc112983de663d.png"},{"artist":"Arctic Monkeys","album":"Brianstorm","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/c1ac18cd9fe64f70b3e741c8bcf1e2ed.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/c1ac18cd9fe64f70b3e741c8bcf1e2ed.png"},{"artist":"Arctic Monkeys","album":"Don't Sit Down 'Cause I've Moved Your Chair","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/0d721b2446974ee880eadedff0dfbfc2.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/0d721b2446974ee880eadedff0dfbfc2.png"},{"artist":"Arctic Monkeys","album":"I Bet You Look Good on the Dancefloor","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/77a0f5c7918844d687ff341978175589.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/77a0f5c7918844d687ff341978175589.png"},{"artist":"Arctic Monkeys","album":"Teddy Picker","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/b06badc6e9b39d8728b5aff44a410117.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/b06badc6e9b39d8728b5aff44a410117.png"},{"artist":"Arctic Monkeys","album":"The View from the Afternoon","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/0854965d96244cc3828f32a3d5ebfc0b.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/0854965d96244cc3828f32a3d5ebfc0b.png"},{"artist":"Alex Turner","album":"Submarine (original songs)","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/b530bdbb5e604252c29ede1a1a28503c.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/b530bdbb5e604252c29ede1a1a28503c.png"},{"artist":"The Last Shadow Puppets","album":"Everything You've Come To Expect (Deluxe Edition)","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/b1a37229361202dcaed6e4ab7d8a1df5.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/b1a37229361202dcaed6e4ab7d8a1df5.png"},{"artist":"Arctic Monkeys","album":"Matador","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/d0fdb13d6b3f504d480659aca2426487.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/d0fdb13d6b3f504d480659aca2426487.png"},{"artist":"Laura Marling","album":"Alas I Cannot Swim","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/65640421e83e46ab93dd4ea637346c4d.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/65640421e83e46ab93dd4ea637346c4d.png"},{"artist":"Laura Marling","album":"A Creature I Don't Know","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/58cf6a572404409c847042953ad85a12.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/58cf6a572404409c847042953ad85a12.png"},{"artist":"Laura Marling","album":"LUMP","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/0f7f7be13188b22418b088aed204c8e2.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/0f7f7be13188b22418b088aed204c8e2.png"},{"artist":"Laura Marling","album":"Once I Was An Eagle","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/17ba033549ac46728bc8530bdf93a741.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/17ba033549ac46728bc8530bdf93a741.png"},{"artist":"Laura Marling","album":"Short Movie","thumbnail":"https://lastfm.freetls.fastly.net/i/u/34s/bc3157f691534937c9d29cc4e0636b70.png","cover":"https://lastfm.freetls.fastly.net/i/u/174s/bc3157f691534937c9d29cc4e0636b70.png"}]
let num = 28;

export class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selections: allThirty.slice(0, num),
            shape: "",
            errors: {selection: "", shape: ""},
            albumRange: {min: 2, max: 30}
        }
        this.albumSelectComponent = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (this.props.editing !== prevProps.editing) {
            // If in editing mode, add the submitted selections and shape back into the menu
            if (this.props.editing) {
                this.setState({
                    selections: this.props.selections,
                    shape: this.props.shape
                })
            } else {
                this.setState({
                    selections: [],
                    shape: ""
                })
                this.handleClearError();
            }
            this.albumSelectComponent.current.handleReset();
        }
    }

    // Add user-added album to selections
    handleAddAlbum = (artist, album, thumbnail, cover) => {
        this.setState({
            selections: [...this.state.selections, {artist, album, thumbnail, cover}],
            shape: ""
        })
    }

    // Remove user-deleted album from selections
    handleDeleteAlbum = (artist, album) => {
        this.setState({
            selections: this.state.selections.filter(selection => (selection.artist !== artist || selection.album !== album)),
            shape: ""
        })
    }

    // Store shape user clicks 
    handleSelectShape = (name, active) => {
        this.setState({
            shape: active ? name : "" 
        })
    }

    handleSubmit = () => {
        // Throw error if minimum number of albums have not been selected
        if (this.state.selections.length < this.state.albumRange.min) {
            this.setState({
                errors: {selection: "Please select at least " + this.state.albumRange.min + " albums", shape: ""}
            })
        // Throw error if no collage shape available for selected number of albums 
        } else if (!possibleNums.includes(this.state.selections.length)) {
            this.setState({
                errors: {selection: "", shape: "No collage shape for this number of albums"}
        })
        // Throw error if no shape has been selected
        } else if (!this.state.shape) {
            this.setState({
                errors: {selection: "", shape: "Please select a collage shape"}
            })
        // Submit album selections and shape to the App component, then reset
        } else {
            this.props.submitCollage(this.state.selections, this.state.shape)
            this.setState({
                selections: [],
                shape: "",
                errors: {selection: "", shape: ""}
            })
            this.albumSelectComponent.current.handleReset();
        }
    }

    // Clear error messages
    handleClearError = () => {
        this.setState({
            errors: {selection: "", shape: ""}
        })
    }

    render() {
        return (
            <section className="menu">
                <h1>Music Collage</h1>
                <AlbumSelect ref={this.albumSelectComponent} selections={this.state.selections} errors={this.state.errors} albumRange={this.state.albumRange} addAlbum={this.handleAddAlbum} deleteAlbum={this.handleDeleteAlbum} clearError={this.handleClearError}/>
                <ShapeSelect selectedShape={this.state.shape} numAlbums={this.state.selections.length} shape={this.state.shape} errors={this.state.errors} selectShape={this.handleSelectShape} clearError={this.handleClearError}/>
                <div className="collage-submit">
                    <button className="search-submit" onClick={this.handleSubmit}>{this.props.editing ? "Save Edits" : "Collage-ify"}</button>
                    <p className="warning">{(this.state.errors.selection) ? this.state.errors.selection : (this.state.errors.shape) ? this.state.errors.shape : ""}</p>
                </div>
            </section>
        )
    }
}

export default Menu;