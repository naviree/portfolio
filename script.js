const totalLines = 24;
let initialized = false;

const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function makePath() {
    let startY = randInt(5, 15);
    let path = `M-${100 / totalLines} ${startY}v${-startY}`;

    for (let i = 0; i < totalLines + 2; i++) {
        let y = randInt(-2, 2);
        path += `l${100 / totalLines} ${y}`;
    }
    path += `v40z`;
    return path;
}

function go() {
    if (!initialized) {
        for (let i = 0; i < totalLines; i++) {
            let p = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            );
            p.id = `p${i}`;
            p.setAttribute("d", makePath());
            p.setAttribute("opacity", (i + 1) / totalLines);
            p.setAttribute(
                "transform",
                `translate(${(-i / totalLines) * 50} ${
                    50 + (50 / totalLines) * i
                }) scale(${1 + i / totalLines})`
            );
            document.querySelector("#mtns").appendChild(p);
        }
        initialized = true;
    }

    if (initialized) {
        for (let i = totalLines - 1; i >= 0; i--) {
            if (document.querySelector(`#p${i - 1}`)) {
                let pathUp = document
                    .querySelector(`#p${i - 1}`)
                    .getAttribute("d");
                document.querySelector(`#p${i}`).setAttribute("d", pathUp);
            }
        }

        // Generate a new random path for the top path
        document.querySelector(`#p0`).setAttribute("d", makePath());
    }
}

go();
setInterval(go, 200);
