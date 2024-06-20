var __awaiter = this && this.__awaiter || function(c, O, t, i) {
    function n(o) {
        return o instanceof t ? o : new t(function(s) {
            s(o)
        })
    }
    return new(t || (t = Promise))(function(o, s) {
        function r(l) {
            try {
                d(i.next(l))
            } catch (a) {
                s(a)
            }
        }

        function v(l) {
            try {
                d(i.throw(l))
            } catch (a) {
                s(a)
            }
        }

        function d(l) {
            l.done ? o(l.value) : n(l.value).then(r, v)
        }
        d((i = i.apply(c, O || [])).next())
    })
};
const THE_WINDOW = unsafeWindow || window;
(function() {
    class c {
        constructor() {
            this.events = new EventTarget, this.state = this.defaultState();
            const t = THE_WINDOW.fetch;
            THE_WINDOW.fetch = function(i) {
                return function(...n) {
                    return __awaiter(this, void 0, void 0, function*() {
                        const o = n[0].toString();
                        return t.apply(THE_WINDOW, n)
                    })
                }
            }(this), location.pathname.startsWith("/challenge/") && THE_WINDOW.addEventListener("load", () => {
                var i, n, o;
                const s = (o = (n = (i = THE_WINDOW?.__NEXT_DATA__) === null || i === void 0 ? void 0 : i.props) === null || n === void 0 ? void 0 : n.pageProps) === null || o === void 0 ? void 0 : o.gameSnapshot;
                !s || !s.round || this.parseData(s)
            }), this.init(), this.loadState()
        }
        init() {
            return __awaiter(this, void 0, void 0, function*() {
                return this.loadedPromise || (this.loadedPromise = Promise.resolve(this)), yield this.loadedPromise
            })
        }
        defaultState() {
            return {
                current_game_id: "",
                is_challenge_link: !1,
                current_round: 0,
                round_in_progress: !1,
                game_in_progress: !0,
                total_score: {
                    amount: 0,
                    unit: "points",
                    percentage: 0
                },
                total_distance: {
                    meters: {
                        amount: 0,
                        unit: "km"
                    },
                    miles: {
                        amount: 0,
                        unit: "miles"
                    }
                },
                total_time: 0,
                rounds: [],
                map: {
                    id: "",
                    name: ""
                }
            }
        }
        parseData(t) {
            t.player.guesses.length == t.round ? this.stopRound(t) : this.startRound(t)
        }
        loadState() {
            let t = window.localStorage.getItem("GeoGuessrEventFramework_STATE");
            if (!t) return;
            let i = JSON.parse(t);
            i && (Object.assign(this.state, this.defaultState(), i), this.saveState())
        }
        saveState() {
            window.localStorage.setItem("GeoGuessrEventFramework_STATE", JSON.stringify(this.state))
        }
        hex2a(t) {
            const i = t.toString();
            let n = "";
            for (let o = 0; o < i.length; o += 2) n += String.fromCharCode(parseInt(i.substr(o, 2), 16));
            return n
        }
        startRound(t) {
            this.state.current_round = t.round, this.state.round_in_progress = !0, this.state.game_in_progress = !0, this.state.current_game_id = t.token, this.state.is_challenge_link = t.type == "challenge", this.state.rounds = this.state.rounds.slice(0, t.round - 1), t && (this.state.map = {
                id: t.map,
                name: t.mapName
            }), this.saveState(), this.state.current_round === 1 && this.events.dispatchEvent(new CustomEvent("game_start", {
                detail: this.state
            })), this.events.dispatchEvent(new CustomEvent("round_start", {
                detail: this.state
            }))
        }
        stopRound(t) {
            var i, n, o, s, r, v, d, l, a, h, m, _, p, f, g, w, S, y, E, k, F, G, D, T, I, x, C, N, b, A;
            if (this.state.round_in_progress = !1, t) {
                const u = t.rounds[this.state.current_round - 1],
                    e = t.player.guesses[this.state.current_round - 1];
                if (!u || !e) return;
                this.state.rounds[this.state.current_round - 1] = {
                    location: {
                        lat: u.lat,
                        lng: u.lng,
                        heading: u.heading,
                        pitch: u.pitch,
                        zoom: u.zoom,
                        panoId: u.panoId ? this.hex2a(u.panoId) : void 0
                    },
                    player_guess: {
                        lat: e.lat,
                        lng: e.lng
                    },
                    score: {
                        amount: parseFloat((i = e?.roundScore) === null || i === void 0 ? void 0 : i.amount) || 0,
                        unit: ((n = e?.roundScore) === null || n === void 0 ? void 0 : n.unit) || "points",
                        percentage: ((o = e?.roundScore) === null || o === void 0 ? void 0 : o.percentage) || 0
                    },
                    distance: {
                        meters: {
                            amount: parseFloat((r = (s = e?.distance) === null || s === void 0 ? void 0 : s.meters) === null || r === void 0 ? void 0 : r.amount) || 0,
                            unit: ((d = (v = e?.distance) === null || v === void 0 ? void 0 : v.meters) === null || d === void 0 ? void 0 : d.unit) || "km"
                        },
                        miles: {
                            amount: parseFloat((a = (l = e?.distance) === null || l === void 0 ? void 0 : l.miles) === null || a === void 0 ? void 0 : a.amount) || 0,
                            unit: ((m = (h = e?.distance) === null || h === void 0 ? void 0 : h.miles) === null || m === void 0 ? void 0 : m.unit) || "miles"
                        }
                    },
                    time: e?.time
                }, this.state.total_score = {
                    amount: parseFloat((p = (_ = t?.player) === null || _ === void 0 ? void 0 : _.totalScore) === null || p === void 0 ? void 0 : p.amount) || 0,
                    unit: ((g = (f = t?.player) === null || f === void 0 ? void 0 : f.totalScore) === null || g === void 0 ? void 0 : g.unit) || "points",
                    percentage: ((S = (w = t?.player) === null || w === void 0 ? void 0 : w.totalScore) === null || S === void 0 ? void 0 : S.percentage) || 0
                }, this.state.total_distance = {
                    meters: {
                        amount: parseFloat((k = (E = (y = t?.player) === null || y === void 0 ? void 0 : y.totalDistance) === null || E === void 0 ? void 0 : E.meters) === null || k === void 0 ? void 0 : k.amount) || 0,
                        unit: ((D = (G = (F = t?.player) === null || F === void 0 ? void 0 : F.totalDistance) === null || G === void 0 ? void 0 : G.meters) === null || D === void 0 ? void 0 : D.unit) || "km"
                    },
                    miles: {
                        amount: parseFloat((x = (I = (T = t?.player) === null || T === void 0 ? void 0 : T.totalDistance) === null || I === void 0 ? void 0 : I.miles) === null || x === void 0 ? void 0 : x.amount) || 0,
                        unit: ((b = (N = (C = t?.player) === null || C === void 0 ? void 0 : C.totalDistance) === null || N === void 0 ? void 0 : N.miles) === null || b === void 0 ? void 0 : b.unit) || "miles"
                    }
                }, this.state.total_time = (A = t?.player) === null || A === void 0 ? void 0 : A.totalTime, this.state.map = {
                    id: t.map,
                    name: t.mapName
                }
            }
            this.saveState(), this.events.dispatchEvent(new CustomEvent("round_end", {
                detail: this.state
            })), this.state.current_round === 5 && this.events.dispatchEvent(new CustomEvent("game_end", {
                detail: this.state
            }))
        }
    }
    THE_WINDOW.GeoGuessrEventFramework || (THE_WINDOW.GeoGuessrEventFramework = new c, console.log("GeoGuessr Event Framework initialised: https://github.com/miraclewhips/geoguessr-event-framework"))
})();
