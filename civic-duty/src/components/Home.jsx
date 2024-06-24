import '../App.css'
import React, { useState, useEffect } from 'react';

export default function Home() {
    return (
        <>
            <div class="buffer"></div>

            <div class="container" id="pb-div">
            <img id="pb-img" src="/images/statement.png" alt="erm." />
            </div>

            <section className="bg-light text-dark pt-5 text-center">
            <div className="container">
                <div class="d-flex">
                    <div>
                        <h3>What is Civic Duty?</h3>
                            <p className="text-sm-left">
                            CivicDuty is a startup company that aims to tackle the issue of politics not being accessible. Although many resources and aspects of government are made available to the public, the existing resources can be so vast and difficult to understand that many people aren't aware of the inner workings of their own governments. CivicDuty aims to rectify this by consolidating available resources and disseminating their complex information until it’s simple and easy to understand, and removing the barriers between people and politics. 
                            </p>
                    </div>
                    <div>
                        <h3>Feature Demo</h3>
                        <p className="text-sm-left">
                            An example of what a display feature on our site would be is a dropdown that filters members of congress based on certain issues that you select, all powered by AI. These congress members work with or have a history of working with the selected issue. <span class="gray">This mock feature is essentially a ChatGPT wrapper that acquires the names of current congress members. The API runs on turbo so it may display former congress members (i.e. Kamala Harris who is the Vice President now) since the knowledge cutoff for "gpt-3.5" is September 2021. </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}