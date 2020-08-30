import React from "react";
import PowerSourceLoad from './PowerSourceLoad';
import GraphLoadEvolution from "./GraphLoadEvolution";
import { ZoneContext } from '../../../ZoneContext';
import PowerSourceNameInline from "../../../power-sources/components/PowerSourceNameInline";
import { first } from "lodash";

class SlideLoad extends React.Component {

    constructor(props) {
        super(props);
    }

    findMostLoaded(breakdownData) {
        let bestComponent = undefined, bestLoadValue = undefined;
        Object.keys(breakdownData).forEach((installationType) => {
            const currentLoadValue = breakdownData[installationType].load.value;

            if (bestComponent == undefined) {
                bestComponent = <PowerSourceNameInline type={installationType} />;
                bestLoadValue = currentLoadValue;
            } else {
                if (currentLoadValue > bestLoadValue) {
                    bestComponent = <PowerSourceNameInline type={installationType} />;
                    bestLoadValue = currentLoadValue;
                }
            }
        });

        return bestComponent;
    }

    findLeastLoaded(breakdownData) {
        let bestComponent = undefined;
        let best = undefined;
        Object.keys(breakdownData).forEach((installationType) => {
            if (best == undefined) {
                bestComponent = <PowerSourceNameInline type={installationType} />;
                best = breakdownData[installationType];
            } else {
                if (breakdownData[installationType].load.value < best.load.value) {
                    bestComponent = <PowerSourceNameInline type={installationType} />;
                    best = breakdownData[installationType];
                }
            }
        });

        return bestComponent;
    }


    render() {
        const currentData = this.props.data.latestBreakdownData;
        const currentZoneID = this.props.currentZone.id;
        const currentZoneName = this.props.currentZone.label;
        const mostLoadedInstallation = this.findMostLoaded(currentData);
        const leastLoadedInstallation = this.findLeastLoaded(currentData);

        const keys = Object.keys(currentData);

        const half = Math.ceil(keys.length / 2);

        const firstHalfOfKeys = keys.splice(0, half)
        const secondHalfOfKeys = keys.splice(-half)

        let firstColumn = [];
        for (let i = 0; i < firstHalfOfKeys.length; i++) {
            const installationType = firstHalfOfKeys[i];
            const newComponent = <div key={installationType}
            className="column is-12-widescreen is-12-full-hd is-12-desktop is-12-tablet is-6-mobile " style={{ "marginTop": "10px" }}>
                <PowerSourceLoad
                    key={installationType}
                    load={currentData[installationType].load}
                    production={currentData[installationType].production}
                    capacity={currentData[installationType].capacity}
                    type={installationType}
                    cssClass="load"
                    mirrored={false}
                />
            </div>
            firstColumn.push(newComponent);
        }

        let secondColumn = [];
        for (let i = 0; i < secondHalfOfKeys.length; i++) {
            const installationType = secondHalfOfKeys[i];
            const newComponent = <div key={installationType}
            className="column is-12-widescreen is-12-full-hd is-12-desktop is-12-tablet is-6-mobile " style={{ "marginTop": "10px" }}>
                <PowerSourceLoad
                    key={installationType}
                    load={currentData[installationType].load}
                    production={currentData[installationType].production}
                    capacity={currentData[installationType].capacity}
                    type={installationType}
                    cssClass="load"
                    mirrored={false}
                />
            </div>
            secondColumn.push(newComponent);
        }

        return (
            <React.Fragment>
                <div className="section is-medium" id="slide-load" style={{ "minHeight": "100vh" }}>
                    {/* <div className="container"> */}
                        <div className="columns is-centered" >
                            <div className="column has-text-centered">
                                <h1 className="is-size-1">Facteur de charge</h1>
                            </div>
                        </div>
                        <div className="columns  is-centered" style={{ "marginBottom": "4rem" }}>
                            <div className="column is-three-quarters has-text-centered">
                                <div className="is-size-6">
                                    Le taux de charge correspond au rapport production effective / capacité installée.<br/>
                                    Si un moyen de production tourne à la moitié de ses capacités, on dit qu'il a un taux de charge de 50%.<br/><br/>
                                </div>
                                <div className="is-size-6">
                                    Une variation du taux de charge peut être subie, lors d'une panne, d'entretien, ou lorsque la source primaire est absente
                                    (<PowerSourceNameInline type="solar"/>, <PowerSourceNameInline type="wind"/> et <PowerSourceNameInline type="hydraulic"/> dans certains cas) : c'est l'intermittence.<br/>
                                    Une variation du taux de charge peut être volontaire quand on utilise un moyen pilotable (dont on peut faire varier la production, comme <PowerSourceNameInline type="fossil"/>, <PowerSourceNameInline type="bioenergy"/>, <PowerSourceNameInline type="nuclear"/> et <PowerSourceNameInline type="hydraulic"/> dans certains cas).
                                </div>
                                <div className="is-size-5" style={{ "marginTop": "2rem" }}>
                                    Actuellement, en <span className="has-background-grey text-inline-highlighted">{currentZoneName}</span>, le parc {mostLoadedInstallation} a le meilleur taux de charge et le parc {leastLoadedInstallation} le plus faible.
                                </div>

                            </div>
                        </div>
                        <div className="columns is-multiline is-centered">
                            <div className="column is-one-fifth">
                                <div id="breakdown" className="columns has-text-centered is-variable is-centered is-mobile is-multiline representations-wrapper">
                                    {firstColumn}


                                    {/* <div className="column is-12-widescreen is-12-full-hd is-12-desktop is-4-tablet is-4-mobile ">
                                        <PowerSourceLoad
                                            load={currentData.solar.load}
                                            production={currentData.solar.production}
                                            capacity={currentData.solar.capacity}
                                            type="solar"
                                            cssClass="load"
                                            mirrored={false}
                                        />
                                    </div>
                                    <div className="column is-12-widescreen is-12-full-hd is-12-desktop is-4-tablet is-4-mobile ">
                                        <PowerSourceLoad
                                            load={currentData.wind.load}
                                            production={currentData.wind.production}
                                            capacity={currentData.wind.capacity}
                                            type="wind"
                                            cssClass="load"
                                            mirrored={false}
                                        />
                                    </div>
                                    <div className="column is-12-widescreen is-12-full-hd is-12-desktop is-4-tablet is-4-mobile ">
                                        <PowerSourceLoad
                                            load={currentData.hydraulic.load}
                                            production={currentData.hydraulic.production}
                                            capacity={currentData.hydraulic.capacity}
                                            type="hydraulic"
                                            cssClass="load"
                                            mirrored={false}
                                        />
                                    </div> */}
                                </div>
                            </div>

                            <div className="column is-6">
                                <GraphLoadEvolution loadsOverTime={this.props.data.breakdownHistory} />

                            </div>
                            <div className="column is-one-fifth">
                                <div id="breakdown" className="columns has-text-centered is-variable is-centered is-mobile is-multiline representations-wrapper">

                                    {secondColumn}

                                    {/* <div className="column is-12-widescreen is-12-full-hd is-12-desktop is-4-tablet is-4-mobile ">
                                        <PowerSourceLoad
                                            load={currentData.nuclear.load}
                                            production={currentData.nuclear.production}
                                            capacity={currentData.nuclear.capacity}
                                            type="nuclear"
                                            cssClass="load"
                                            mirrored={true}
                                        />
                                    </div>
                                    <div className="column is-12-widescreen is-12-full-hd is-12-desktop is-4-tablet is-4-mobile ">
                                        <PowerSourceLoad
                                            load={currentData.bioenergy.load}
                                            production={currentData.bioenergy.production}
                                            capacity={currentData.bioenergy.capacity}
                                            type="bioenergy"
                                            cssClass="load"
                                            mirrored={true}
                                        />
                                    </div>
                                    <div className="column is-12-widescreen is-12-full-hd is-12-desktop is-4-tablet is-4-mobile ">
                                        <PowerSourceLoad
                                            load={currentData.fossil.load}
                                            production={currentData.fossil.production}
                                            capacity={currentData.fossil.capacity}
                                            type="fossil"
                                            cssClass="load"
                                            mirrored={true}
                                        />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                {/* </div > */}
            </React.Fragment >
        );
    }
}

SlideLoad.contextType = ZoneContext;

export default SlideLoad;
