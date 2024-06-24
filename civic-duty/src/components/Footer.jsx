import * as React from 'react';

export default function Footer() {
    return (
        <section className="bg-light text-dark pt-5 text-center">
            <div className="container">
                <div class="d-flex">
                    <div>
                        <h2 className="text-sm-left" >Customer Discovery</h2>
                            <p className="text-sm-left">
                            We're in the development stage of the company, and one way to help us currently is to fill this <a href="https://docs.google.com/forms/d/e/1FAIpQLScxXPJPUP5Po3inGde_MXC49lJXxtSqwtTSk9KYGkf4mtIXvw/viewform?embedded=true">political interest survey.</a> The results of this survey will help us gain insight into our problem statement and what kind of solutions we can make to directly address these issues people face with understanding politics. 
                            </p>
                    </div>
                </div>
            </div>
        </section>
    );
}