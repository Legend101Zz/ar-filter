var JEELIZFACEFILTER = (function () {
  window.JEELIZFACEFILTERGEN = function () {
    function Fb(a) {
      var c = null,
        d = null,
        e = null,
        m = 0;
      this.A = function (n) {
        this.Cf(n.pb);
        e.Be({ qc: n.qc, nc: n.nc });
      };
      this.We = function (n) {
        return c[n];
      };
      this.Cf = function (n) {
        var q = null;
        m = n.length;
        c = n.map(function (r, l) {
          r = Object.assign({}, r, {
            index: l,
            parent: this,
            vb: q,
            ff: l === m - 1,
          });
          return (q = l = 0 === l ? Gb.instance(r) : Hb.instance(r));
        });
        d = c[0];
        e = c[m - 1];
        c.forEach(function (r, l) {
          0 !== l && r.uf();
        });
      };
      this.V = function (n) {
        var q = n;
        c.forEach(function (r) {
          q = r.V(q, !1);
        });
        return q;
      };
      this.Ve = function () {
        return d.F();
      };
      this.Xb = function () {
        return e.Xe();
      };
      this.nd = function () {
        return e.nd();
      };
      this.m = function () {
        c &&
          (c.forEach(function (n) {
            n.m();
          }),
          (e = d = c = null),
          (m = 0));
      };
      "undefined" !== typeof a && this.A(a);
    }
    function db(a, c) {
      var d = c % 8;
      return (a[(c - d) / 8] >> (7 - d)) & 1;
    }
    function Ib(a) {
      var c = JSON.parse(a);
      a = c.ne;
      var d = c.nf,
        e = c.n;
      var m =
        "undefined" === typeof btoa
          ? Buffer.from(c.data, "base64").toString("latin1")
          : atob(c.data);
      var n = m.length;
      c = new Uint8Array(n);
      for (var q = 0; q < n; ++q) c[q] = m.charCodeAt(q);
      m = new Float32Array(e);
      n = new Float32Array(d);
      q = a + d + 1;
      for (var r = 0; r < e; ++r) {
        for (
          var l = q * r,
            v = 0 === db(c, l) ? 1 : -1,
            C = l + 1,
            E = 1,
            g = 0,
            t = C + a - 1;
          t >= C;
          --t
        )
          (g += E * db(c, t)), (E *= 2);
        C = g;
        l = l + 1 + a;
        E = n.length;
        g = 0;
        for (t = l; t < l + E; ++t) (n[g] = db(c, t, !0)), ++g;
        for (E = l = 0; E < d; ++E) l += n[E] * Math.pow(2, -E - 1);
        m[r] =
          0 === l && 0 === C
            ? 0
            : v * (1 + l) * Math.pow(2, 1 + C - Math.pow(2, a - 1));
      }
      return m;
    }
    function Ya() {
      return -1 !== [ia.ready, ia.play, ia.pause].indexOf(na);
    }
    function eb() {
      if (na === ia.play) return !1;
      na = ia.play;
      Ma.stop();
      qb(0);
    }
    function rb() {
      if (na !== ia.play) return !1;
      Ma.stop();
      na = ia.pause;
      return !0;
    }
    function Fa(a, c, d, e, m) {
      a = 4 * (3 * c + a) + d;
      return e + (X.buffer[a] / 255 + X.buffer[a + 12] / 65025) * (m - e);
    }
    function fb() {
      b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
      va.ha();
      U.reset();
      Y.reset();
      A.R();
      A.ad();
      b.disable(b.DEPTH_TEST);
      b.disable(b.BLEND);
      U.Ja();
      A.Ba();
    }
    function Jb() {
      va.P();
      b.viewport(0, 0, 3, 2 * O.o);
      A.set("s53");
      X.Da.g(0);
      U.l(!1, !1);
      return aa.xb(0, 0, 3, 2 * O.o, X.buffer);
    }
    function qb() {
      na !== ia.pause &&
        (ea.isCleanGLStateAtEachIteration &&
          (A.ad(),
          U.reset(),
          U.Ja(),
          b.disable(b.DEPTH_TEST),
          b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1),
          A.Ba()),
        pa.rc(Kb, Jb, Lb, Mb, ea.animateProcessOrder));
    }
    function Kb() {
      va.ha();
      if (!B.kb)
        if (B.jb)
          B.element.needsUpdate &&
            (B.N.Rf(B.element.arrayBuffer), (B.element.needsUpdate = !1));
        else {
          var a = B.element.currentTime,
            c = a - B.wb;
          0 > c && (B.wb = a);
          1e3 * c < ba.Tf || ((B.wb += c), B.N.refresh());
        }
      a = pa.od();
      if (O.W.length > a) O.W.splice(0, O.W.length - a);
      else for (; O.W.length < a; ) O.W.push(0);
      if (1 !== O.o)
        if (qa.every(Nb)) {
          for (var d = 0, e = (c = 0); e < qa.length; ++e)
            qa[e].detected > d && ((d = qa[e].detected), (c = 0));
          for (d = 0; d < a; ++d) O.W[d] = c;
        } else {
          c = Math.round(ba.pf * a);
          c = Math.min(1, c);
          d = O.Fd;
          for (var m = (e = 0); e < a; ++e) {
            if (!gb(qa[d]) && ++m > c) {
              do ++d === O.o && (d = 0);
              while (!gb(qa[d]));
            }
            O.W[e] = d++;
            d %= O.o;
          }
          O.Fd = d;
        }
      for (a = 0; a < pa.od(); ++a)
        (O.pa = O.W[a]),
          (O.mc = (0.5 + O.pa) / O.o),
          (O.Ad = O.W.lastIndexOf(O.pa) === a),
          A.set("s55"),
          (c = qa[O.pa]),
          A.G("u43", 1 + Na.uc * (Math.cos(c.ry) - 1)),
          Q.ua && A.G("u42", c.rz),
          1 !== O.o && A.G("u41", O.mc),
          Z.xa.da(),
          B.N.g(0),
          X.Da.g(1),
          U.l(!1, !1),
          Z.xa.g(0),
          Oa.V(Z.xa);
      pa.ae();
    }
    function Lb() {
      for (var a = 0; a < O.o; ++a)
        if (-1 !== O.W.indexOf(a)) {
          var c = a,
            d = Sa[c],
            e = [c],
            m = qa[c],
            n = hb[c],
            q = 2 * c;
          d.Wa = Fa(1, q, 3, 0, 1);
          m.detected = wa.$(m.detected, d.Wa, ba.ke);
          if (d.Wa < ea.multiDetectionThresholdFactors[0] * ea.threshold)
            (d.Aa = Math.floor(d.Aa / 2)), Q.ua && ((m.rz = 0), (m.ry = 0));
          else {
            var r = X.Pa;
            d.x = Fa(0, q, 1, -1, 1);
            d.y = Fa(0, q, 2, -1, 1);
            d.ca = Fa(0, q, 3, 0, 1);
            d.sc = Fa(1, q, 0, -r[0], r[0]);
            d.tc = Fa(1, q, 1, -r[1], r[1]);
            d.Qa = Fa(1, q, 2, -r[2], r[2]);
            for (r = 0; r < X.aa; ++r) d.hd[r] = X.Na[r](Fa(2, q, r, 0, 1));
            e.Rb = d.x - m.xRaw;
            e.Sb = d.y - m.yRaw;
            e.Qb = d.ca - m.sRaw;
            e.Nb = d.sc - m.rx;
            e.Ob = d.tc - m.ry;
            e.Pb = Q.ua ? d.Qa : d.Qa - m.rz;
            q = pa.Qe();
            e =
              (1 -
                Za.qb(
                  sa.translationFactorRange[0],
                  sa.translationFactorRange[1],
                  Math.sqrt(e.Rb * e.Rb + e.Sb * e.Sb + e.Qb * e.Qb) / q
                )) *
              (1 -
                Za.qb(
                  sa.rotationFactorRange[0],
                  sa.rotationFactorRange[1],
                  Math.sqrt(e.Nb * e.Nb + e.Ob * e.Ob + e.Pb * e.Pb) / q
                )) *
              Za.qb(sa.qualityFactorRange[0], sa.qualityFactorRange[1], d.Wa);
            c = n[++ib[c] % n.length] = e;
            for (q = 0; q < n.length; ++q) c = Math.min(c, n[q]);
            c = Math.max(0.5, c);
            e = Math.min(c, e);
            n = wa.$(sa.alphaRange[1], sa.alphaRange[0], Math.pow(e, ba.me));
            m.xRaw = wa.$(m.xRaw, d.x, n);
            m.yRaw = wa.$(m.yRaw, d.y, n);
            m.sRaw = wa.$(m.sRaw, d.ca, n);
            m.rx = wa.$(m.rx, d.sc, n);
            m.ry = wa.$(m.ry, d.tc, n);
            m.rz = Q.ua
              ? m.rz + sa.followZRotAlphaFactor * n * d.Qa
              : wa.$(m.rz, d.Qa, n);
            c = m.sRaw * Na.Mb * Math.sin(m.ry);
            e = (Math.sin(m.rz) * c) / Pa;
            m.x = m.xRaw + Math.cos(m.rz) * c;
            m.y = m.yRaw + e;
            m.s = m.sRaw;
            n = Math.max(n, ba.le);
            for (c = 0; c < X.aa; ++c)
              m.expressions[c] = wa.$(m.expressions[c], d.hd[c], n);
            ++d.Aa;
          }
        }
      va.Pf();
      ea.isCleanGLStateAtEachIteration &&
        (va.reset(), Y.reset(), b.enable(b.DEPTH_TEST));
      Q.Va && (1 === O.o ? Q.Va(qa[0]) : Q.Va(qa));
      ea.isCleanGLStateAtEachIteration && b.disable(b.BLEND);
    }
    function Mb() {
      na === ia.play && Ma.rc(qb);
    }
    function sb() {
      Z.xa = Y.instance({ isPot: !0, isFloat: !1, width: Oa.Ve() });
      for (
        var a = ba.Yd,
          c = O.o,
          d = new Float32Array([0, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
          e = new Float32Array(d.length * O.o),
          m = 0,
          n;
        m < O.o;
        ++m
      )
        for (n = 0; n < d.length; ++n) e[m * d.length + n] = d[n];
      X.Da = Ob.instance({
        width: a,
        height: c,
        isFloat: !0,
        isPot: !1,
        array: e,
      });
    }
    function Pb() {
      function a(c) {
        for (var d = [], e = 0; e < O.o; ++e)
          d.push(JSON.parse(JSON.stringify(c)));
        return d;
      }
      X.buffer = new Uint8Array(8 * ba.Yd * O.o);
      Sa = a({
        Wa: 0,
        x: 0,
        y: 0,
        ca: 1,
        sc: 0,
        tc: 0,
        Qa: 0,
        hd: new Float32Array(X.aa),
        Aa: 0,
      });
      qa = a({
        detected: 0,
        x: 0,
        y: 0,
        s: 1,
        xRaw: 0,
        yRaw: 0,
        sRaw: 1,
        rx: 0,
        ry: 0,
        rz: 0,
        expressions: new Float32Array(X.aa),
      });
      a({ Rb: 0, Sb: 0, Qb: 0, Nb: 0, Ob: 0, Pb: 0 });
    }
    function jb() {
      A.T("s55", [
        { type: "1i", name: "u1", value: 0 },
        { type: "1i", name: "u39", value: 1 },
        { type: "2f", name: "u40", value: Z.H },
        { type: "1f", name: "u41", value: 0.5 },
        { type: "1f", name: "u42", value: 0 },
      ]);
      A.T("s56", [
        { type: "1i", name: "u44", value: 0 },
        { type: "1i", name: "u39", value: 1 },
        { type: "1f", name: "u47", value: ba.Nf },
        { type: "1f", name: "u48", value: ea.threshold },
        {
          type: "3f",
          name: "u46",
          value: [X.O[0] * Z.H[0], X.O[1] * Z.H[1], X.O[2]],
        },
        { type: "1f", name: "u41", value: 0.5 },
        { type: "1f", name: "u49", value: 1 },
        { type: "1f", name: "u42", value: 0 },
      ]);
      var a = [{ type: "1i", name: "u44", value: 0 }];
      A.T("s57", a);
      A.T("s58", a);
      A.T("s53", [
        { type: "1i", name: "u39", value: 0 },
        { type: "1f", name: "u52", value: Z.H[0] },
        { type: "2f", name: "u51", value: [0, 0.5 / O.o] },
      ]);
    }
    function kb() {
      Z.H[0] = 1;
      Z.H[1] = Z.D / Z.M;
      tb.A({
        ub: ea.overlapFactors,
        Kd: ea.nScaleLevels,
        D: Z.D,
        M: Z.M,
        Td: ea.scale0Factor,
        O: X.O,
        Ud: ea.scanCenterFirst,
      });
    }
    function Qb(a) {
      if (Q.Fa) ub("string" === typeof Q.Fa ? JSON.parse(Q.Fa) : Q.Fa, a);
      else {
        var c = Q.Mc;
        "JSON" !== c.toUpperCase().split(".").pop() &&
          (c += ba.neuralNetworkPath);
        vb.get(c, function (d) {
          d = JSON.parse(d);
          ub(d, a);
        });
      }
    }
    function ub(a, c) {
      if (a.exportData) {
        var d = a.exportData;
        d.rotationEulerAnglesFactors && (X.Pa = d.rotationEulerAnglesFactors);
        d.translationScalingFactors && (X.O = d.translationScalingFactors);
        "undefined" !== typeof d.nExpressions && (X.aa = d.nExpressions);
        Na.uc = 0.4;
        Na.Mb = 0.7;
        "undefined" !== typeof d.fgScaleXFactor && (Na.uc = d.fgScaleXFactor);
        "undefined" !== typeof d.fgDisplaceXFactor &&
          (Na.Mb = d.fgDisplaceXFactor);
      }
      X.aa || (X.aa = ba.Jd);
      if (!X.Na) for (X.Na = [], d = 0; d < X.aa; ++d) X.Na.push(ba.Ke);
      c(a);
    }
    function Rb() {
      if (
        Qa.A({
          Jb: Q.ia,
          width: Z.D,
          height: Z.M,
          debug: !1,
          Ld: function () {
            Ha("GLCONTEXT_LOST");
          },
          antialias: Q.antialias,
          premultipliedAlpha: !0,
        })
      )
        return !0;
      Ha("GL_INCOMPATIBLE");
      return !1;
    }
    function gb(a) {
      return a.detected > ea.multiDetectionThresholdFactors[1] * ea.threshold;
    }
    function Nb(a) {
      return !gb(a);
    }
    function wb(a, c, d, e) {
      return d > a
        ? Math.max(0, a + c / 2 - (d - e / 2))
        : Math.max(0, d + e / 2 - (a - c / 2));
    }
    function Sb() {
      return Sa.some(function (a, c) {
        if (c === O.pa) return !1;
        c = Sa[O.pa];
        if (c.Aa > a.Aa || 3 > a.Aa || wb(c.x, c.ca, a.x, a.ca) < ba.Hd * c.ca)
          return !1;
        var d = Z.D / Z.M;
        return wb(c.y, c.ca * d, a.y, a.ca * d) > ba.Hd * c.ca * d;
      });
    }
    function Tb() {
      var a = O.pa;
      X.Da.Bf(1);
      1 !== O.o &&
        (b.viewport(0, 0, 3, O.o),
        A.set("s0"),
        A.Xd("u1", 1),
        U.l(!1, !1),
        A.Xd("u1", 0));
      b.viewport(0, a, 1, 1);
      A.set("s56");
      Q.ua && A.G("u42", qa[a].rz);
      1 !== O.o && A.G("u41", O.mc);
      if (1 < O.o) {
        var c = Sb() ? 0 : 1;
        A.G("u49", c);
      }
      A.Gf("u45", tb.get());
      U.l(!1, !1);
      O.Ad &&
        (b.viewport(1, a, 1, 1),
        A.set("s57"),
        A.G("u49", 1),
        U.l(!1, !1),
        b.viewport(2, a, 1, 1),
        A.set("s58"),
        U.l(!1, !1));
    }
    function xb() {
      B.N && B.N.remove();
      B.jb = B.element.isFakeVideo ? !0 : !1;
      if (B.jb) {
        var a = yb();
        a = {
          isFlipY: !1,
          array: B.element.arrayBuffer,
          width: a.w,
          height: a.wa,
          isKeepArray: !0,
        };
      } else a = { I: B.element };
      B.zc = Y.instance(
        Object.assign({ isPot: !1, isLinear: !0, isFloat: !1 }, a)
      );
      B.N = B.zc;
    }
    function Ia() {
      var a = [{ type: "mat2", name: "u38", value: B.v }];
      A.T("s54", [{ type: "1i", name: "u1", value: 0 }].concat(a));
      A.T("s55", a);
    }
    function Ja() {
      B.L[0] = 0.5;
      B.L[1] = 0.5;
      var a = B.H[1] / B.H[0];
      Pa = Qa.U() / Qa.F();
      90 === Math.abs(oa.rotate) && (a = 1 / a);
      a > Pa ? (B.L[1] *= Pa / a) : (B.L[0] *= a / Pa);
      A.T("s56", [{ name: "u50", type: "1f", value: Pa }]);
      B.v[0] = 0;
      B.v[1] = 0;
      B.v[2] = 0;
      B.v[3] = 0;
      switch (oa.rotate) {
        case 0:
          B.v[0] = B.L[0];
          B.v[3] = B.L[1];
          break;
        case 180:
          B.v[0] = -B.L[0];
          B.v[3] = -B.L[1];
          break;
        case 90:
          B.v[1] = B.L[0];
          B.v[2] = -B.L[1];
          break;
        case -90:
          (B.v[1] = -B.L[0]), (B.v[2] = B.L[1]);
      }
      oa.flipX && ((B.v[0] *= -1), (B.v[2] *= -1));
      B.kb || ((B.v[1] *= -1), (B.v[3] *= -1));
    }
    function yb() {
      var a = {
        w: B.element.videoWidth || B.element.width,
        wa: B.element.videoHeight || B.element.height,
      };
      if (!a.w || !a.wa || 4 > a.w || 4 > a.wa)
        throw Error(
          "INVALID VIDEO DIMENSIONS - width = " + a.w + " height = " + a.wa
        );
      return a;
    }
    function lb() {
      var a = yb(),
        c = B.H[0] !== a.w || B.H[1] !== a.wa;
      c && ((B.H[0] = a.w), (B.H[1] = a.wa));
      return c;
    }
    function $a(a, c) {
      if (na === ia.error) return !1;
      B.element = a;
      lb();
      c && c();
      return !0;
    }
    function zb(a, c, d) {
      a && a();
      B.La = {
        video: {
          facingMode: { exact: oa.facingMode },
          width: { min: oa.minWidth, max: oa.maxWidth, ideal: oa.idealWidth },
          height: {
            min: oa.minHeight,
            max: oa.maxHeight,
            ideal: oa.idealHeight,
          },
        },
        audio: !1,
      };
      W.Oc(B.La, oa.deviceId);
      W.get(
        B.element ? B.element : W.Ze(),
        function (e) {
          c && c(e);
          d(e);
        },
        function () {
          Ha("WEBCAM_UNAVAILABLE");
        },
        B.La
      );
    }
    function Ha(a) {
      na !== ia.error && ((na = ia.error), Q.Ka && Q.Ka(a));
    }
    var wa = {
        Qg: function (a) {
          return Math.ceil(Math.log2(a));
        },
        jh: function (a) {
          return Math.log2(a);
        },
        fh: function (a) {
          return 0 === Math.log2(a) % 1;
        },
        dg: function (a) {
          var c = [0, 0, 0, 0];
          a.forEach(function (d) {
            c[0] += d[0];
            c[1] += d[1];
            c[2] += d[2];
            c[3] += d[3];
          });
          return c;
        },
        eg: function (a, c, d) {
          return Math.min(Math.max(a, c), d);
        },
        hg: function (a) {
          return (a * Math.PI) / 180;
        },
        oh: function (a, c) {
          c = Math.pow(10, c);
          return Math.round(a * c) / c;
        },
        ph: function (a) {
          return Math.round(1e6 * a) / 1e6;
        },
        Rg: function (a, c) {
          return ((100 * a) / c).toFixed(3);
        },
        $: function (a, c, d) {
          return a * (1 - d) + c * d;
        },
        Ge: function (a, c) {
          return wa.ye(a - c);
        },
        ye: function (a) {
          for (; a > Math.PI; ) a -= 2 * Math.PI;
          for (; a <= -Math.PI; ) a += 2 * Math.PI;
          return a;
        },
        kg: function (a, c) {
          return Math.abs(wa.Ge(a, c));
        },
        Uf: function (a, c) {
          return Math.atan2(
            Math.sin(a) + Math.sin(c),
            Math.cos(a) + Math.cos(c)
          );
        },
      },
      vb = {
        get: function (a, c, d) {
          var e = new XMLHttpRequest();
          e.open("GET", a, !0);
          e.withCredentials = !1;
          e.onreadystatechange = function () {
            4 === e.readyState &&
              (200 === e.status || 0 === e.status
                ? c(e.responseText)
                : "undefined" !== typeof d && d(e.status));
          };
          e.send();
        },
        Ng: function (a, c) {
          vb.get(a, function (d) {
            c(JSON.parse(d));
          });
        },
        lh: function (a, c, d) {
          var e = new XMLHttpRequest();
          e.open("POST", a, !0);
          e.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
          );
          e.onreadystatechange = function () {
            4 !== e.readyState ||
              (200 !== e.status && 0 !== e.status) ||
              d(e.responseText);
          };
          e.send(c);
        },
        Bg: function (a, c) {
          var d = new XMLHttpRequest();
          d.open("POST", a, !0);
          d.responseType = "arraybuffer";
          d.onload = function () {
            c(d.response);
          };
          d.send();
        },
      },
      Ub = {
        create: function (a, c) {
          for (var d = Array(c), e = 0; e < c; ++e) d[e] = a;
          return d;
        },
        ig: function (a, c) {
          for (var d = 0; d < a.length; ++d) c[d] = a[d];
        },
        clone: function (a) {
          for (var c = Array(a.length), d = 0; d < a.length; ++d) c[d] = a[d];
          return c;
        },
        sh: function (a, c, d) {
          a.forEach(function (e, m) {
            c[m] = e * d;
          });
        },
        Ch: function (a) {
          for (var c = a.length - 1; 0 < c; --c) {
            var d = Math.floor(Math.random() * (c + 1)),
              e = a[c];
            a[c] = a[d];
            a[d] = e;
          }
        },
        Mf: function (a) {
          return (
            Array.isArray(a) ||
            a.constructor === Float32Array ||
            a.constructor === Uint8Array
          );
        },
      },
      mb = {
        Kb: function (a, c) {
          if (0 === c || "object" !== typeof a) return a;
          a = Object.assign({}, a);
          c = void 0 === c || -1 === c ? -1 : c - 1;
          for (var d in a) a[d] = mb.Kb(a[d], c);
          return a;
        },
      },
      Za = {
        Dh: function (a, c, d) {
          a = Math.min(Math.max((d - a) / (c - a), 0), 1);
          return a * a * (3 - 2 * a);
        },
        qb: function (a, c, d) {
          return Math.min(Math.max((d - a) / (c - a), 0), 1);
        },
        vg: function (a, c, d, e) {
          return Math.pow(Math.min(Math.max((e - a) / (c - a), 0), 1), d);
        },
        Hh: function () {
          return 0;
        },
        kh: function () {
          return 1;
        },
        ih: function (a) {
          return a;
        },
        sg: function (a) {
          return a * a;
        },
        xg: function (a) {
          return a * (2 - a);
        },
        pg: function (a) {
          return 0.5 > a ? 2 * a * a : -1 + (4 - 2 * a) * a;
        },
        ng: function (a) {
          return a * a * a;
        },
        wg: function (a) {
          return --a * a * a + 1;
        },
        og: function (a) {
          return 0.5 > a
            ? 4 * a * a * a
            : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1;
        },
        tg: function (a) {
          return a * a * a * a;
        },
        yg: function (a) {
          return 1 - --a * a * a * a;
        },
        qg: function (a) {
          return 0.5 > a ? 8 * a * a * a * a : 1 - 8 * --a * a * a * a;
        },
        ug: function (a) {
          return a * a * a * a * a;
        },
        zg: function (a) {
          return 1 + --a * a * a * a * a;
        },
        rg: function (a) {
          return 0.5 > a
            ? 16 * a * a * a * a * a
            : 1 + 16 * --a * a * a * a * a;
        },
      },
      Vb = {
        Me: function (a, c, d) {
          switch (a) {
            case "relu":
              return d + "=max(vec4(0.,0.,0.,0.)," + c + ");";
            case "elu":
              return (
                d +
                "=mix(exp(-abs(" +
                c +
                "))-vec4(1.,1.,1.,1.)," +
                c +
                ",step(0.," +
                c +
                "));"
              );
            case "elu01":
              return (
                d +
                "=mix(0.1*exp(-abs(" +
                c +
                "))-vec4(0.1,0.1,0.1,0.1)," +
                c +
                ",step(0.," +
                c +
                "));"
              );
            case "arctan":
              return (
                d + "=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;"
              );
            case "copy":
              return "";
            default:
              return !1;
          }
        },
      },
      A = (function () {
        function a(u, f, y) {
          f = u.createShader(f);
          u.shaderSource(f, y);
          u.compileShader(f);
          return u.getShaderParameter(f, u.COMPILE_STATUS) ? f : !1;
        }
        function c(u, f, y) {
          f = a(u, u.VERTEX_SHADER, f);
          y = a(u, u.FRAGMENT_SHADER, y);
          u === b && q.push(f, y);
          var G = u.createProgram();
          u.attachShader(G, f);
          u.attachShader(G, y);
          u.linkProgram(G);
          return G;
        }
        function d(u, f) {
          f.C = f.C ? !0 : !1;
          if (!f.C) {
            void 0 === f.ta &&
              (f.ta =
                "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}");
            void 0 === f.Ta && (f.Ta = ["a0"]);
            void 0 === f.Ha && (f.Ha = [2]);
            if (void 0 === f.precision || "highp" === f.precision)
              f.precision = E;
            f.id = v++;
            void 0 !== f.Vd &&
              (f.Vd.forEach(function (G, L) {
                f.h = f.h.replace(G, f.yb[L]);
              }),
              f.Vd.splice(0));
            f.Hc = 0;
            f.Ha.forEach(function (G) {
              f.Hc += 4 * G;
            });
            f.ra = c(u, f.ta, "precision " + f.precision + " float;\n" + f.h);
            f.B = {};
            f.i.forEach(function (G) {
              f.B[G] = u.getUniformLocation(f.ra, G);
            });
            f.attributes = {};
            f.Ia = [];
            f.Ta.forEach(function (G) {
              var L = u.getAttribLocation(f.ra, G);
              f.attributes[G] = L;
              f.Ia.push(L);
            });
            if (f.j) {
              u.useProgram(f.ra);
              l = f;
              r = f.id;
              for (var y in f.j) u.uniform1i(f.B[y], f.j[y]);
            }
            f.qa = !0;
          }
        }
        function e(u) {
          xa.Ff(M);
          r !== u.id &&
            (M.R(),
            (r = u.id),
            (l = u),
            b.useProgram(u.ra),
            u.Ia.forEach(function (f) {
              0 !== f && b.enableVertexAttribArray(f);
            }));
        }
        function m(u, f, y) {
          d(u, f, y);
          u.useProgram(f.ra);
          u.enableVertexAttribArray(0);
          r = -1;
          return (l = f);
        }
        function n() {
          return {
            h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
            i: ["u1"],
            j: { u1: 0 },
          };
        }
        var q = [],
          r = -1,
          l = null,
          v = 0,
          C = !1,
          E = "highp",
          g = ["u1"],
          t = ["u0"],
          x = { u1: 0 },
          k = { u0: 0 },
          p = { u1: 0, u2: 1 },
          H = { u3: 0 },
          I = {
            s0: n(),
            s1: {
              h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
              i: g,
              j: x,
              precision: "lowp",
            },
            s2: {
              h: "uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}",
              i: ["u1", "u2"],
              j: p,
            },
            s3: {
              h: "uniform sampler2D u1;uniform vec2 u4,u5;varying vec2 vv0;void main(){vec2 a=vv0*u4+u5;gl_FragColor=texture2D(u1,a);}",
              i: ["u1", "u4", "u5"],
              j: x,
              C: !0,
            },
            s4: {
              h: "uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}",
              i: g,
              j: x,
            },
            s5: {
              h: "uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}",
              i: ["u1", "u2"],
              j: p,
            },
            s6: {
              h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}",
              i: g,
              j: x,
            },
            s7: {
              h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}",
              i: g,
              j: x,
            },
            s8: {
              h: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u4;}",
              i: ["u0", "u4"],
              j: k,
            },
            s9: {
              h: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;const vec4 f=vec4(.25,.25,.25,.25),g=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u4,f);gl_FragColor=b*g;}",
              i: ["u0", "u4"],
              j: k,
            },
            s10: {
              h: "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}",
              i: g,
              j: x,
            },
            s11: {
              h: "uniform sampler2D u1,u6;uniform float u7;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u6,vv0);gl_FragColor=mix(b,a,u7*f);}",
              i: ["u1", "u6", "u7"],
              j: { u1: 0, u6: 1 },
            },
            s12: {
              h: "uniform sampler2D u1;uniform vec2 u8;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u8)+texture2D(u1,vv0+u8*vec2(1.,-1.))+texture2D(u1,vv0+u8*vec2(-1.,-1.))+texture2D(u1,vv0+u8*vec2(-1.,1.)));}",
              i: ["u1", "u8"],
              j: x,
            },
            s13: {
              h: "uniform sampler2D u1;uniform vec4 u9;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 j(float a){if(a==0.)return vec4(0.,0.,0.,0.);float k=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),l=c+127.,b=(a/exp2(c)-1.)*8388608.,d=l/2.,m=fract(d)*2.,n=floor(d),o=e(b,0.,8.),p=e(b,8.,16.),q=m*128.+e(b,16.,23.),r=k+n;return vec4(o,p,q,r)/255.;}void main(){float a=dot(texture2D(u1,vv0),u9);gl_FragColor=j(a);}",
              i: ["u1", "u9"],
              j: x,
            },
            s14: {
              h: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}",
              i: t,
              j: k,
              C: !0,
            },
            s15: {
              h: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(f,a);}",
              i: t,
              j: k,
            },
            s16: {
              h: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-f,a,step(0.,a));}",
              i: t,
              j: k,
            },
            s17: {
              h: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(-abs(a))-f;gl_FragColor=mix(.1*b,a,step(0.,a));}",
              i: t,
              j: k,
            },
            s18: {
              h: "uniform sampler2D u0,u7,u10;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u7,vv0),d=texture2D(u10,vv0),b=a/d;gl_FragColor=c*mix(exp(-abs(b))-f,b,step(0.,a));}",
              i: ["u0", "u7", "u10"],
              j: { u0: 0, u7: 1, u10: 2 },
              C: !0,
            },
            s19: {
              h: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}",
              i: t,
              j: k,
            },
            s20: {
              h: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=log(f+a);gl_FragColor=b;}",
              i: t,
              j: k,
              C: !0,
            },
            s21: {
              h: "uniform sampler2D u0,u11;uniform float u12;const vec2 e=vec2(.5,.5);const float f=1e-5;const vec4 g=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u11,e);float b=u12*u12;vec4 c=max(b*a,f*g);gl_FragColor=texture2D(u0,vv0)/c;}",
              i: ["u0", "u11", "u12"],
              j: { u0: 0, u11: 1 },
              C: !0,
            },
            s22: {
              h: "uniform sampler2D u1;uniform vec2 u13;varying vec2 vv0;void main(){float a=u13.x*u13.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u13.y),f=floor(u13.x*fract(b*u13.y)),g=(f*u13.y+d)/a;gl_FragColor=texture2D(u1,g+c/a);}",
              i: ["u1", "u13"],
              j: x,
            },
            s23: {
              h: "uniform sampler2D u14,u15,u16;varying vec2 vv0;void main(){vec4 a=texture2D(u16,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u14,b),f=texture2D(u15,c);gl_FragColor=d*f;}",
              i: ["u14", "u15", "u16"],
              j: { u15: 0, u14: 1, u16: 2 },
              C: !0,
            },
            s24: {
              h: "uniform float u17;uniform sampler2D u14,u15;varying vec2 vv0;void main(){vec2 a=fract(vv0*u17);vec4 b=texture2D(u14,vv0),c=texture2D(u15,a);gl_FragColor=b*c;}",
              i: ["u15", "u14", "u17"],
              j: { u15: 0, u14: 1 },
            },
            s25: {
              h: "uniform float u17;uniform sampler2D u14,u15,u18,u19,u20,u21;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 h=vv0*u17,l=floor(h),c=h-l;vec4 m=texture2D(u14,vv0),d=texture2D(u15,c),a=texture2D(u21,vv0);a=a*255.;vec4 n=texture2D(u18,c),o=texture2D(u19,c),p=texture2D(u20,c),i=step(-g,-a),b=e-i,j=b*step(-e-g,-a);b*=e-j;vec4 k=b*step(-2.*e-g,-a);b*=e-k;vec4 q=b;d=i*d+j*n+k*o+q*p,gl_FragColor=m*d;}",
              i: "u14 u15 u17 u21 u18 u19 u20".split(" "),
              j: { u15: 0, u14: 1, u21: 3, u18: 4, u19: 5, u20: 6 },
              C: !0,
            },
            s26: {
              h: "uniform sampler2D u14,u15,u22;uniform float u17,u23,u24,u25;varying vec2 vv0;const vec2 j=vec2(1.,1.);void main(){vec2 a=floor(u23*vv0),b=u23*vv0-a;float c=u17/u23;vec2 d=floor(b*c),f=b*c-d,g=(a+f)/u23;float k=u23*u25/u17;vec2 l=k*d,h=(l+f*u24)/u25,i=step(h,j);vec4 m=texture2D(u14,g),n=texture2D(u15,h),o=m*n*i.x*i.y,p=texture2D(u22,g);gl_FragColor=o*u24*u24+p;}",
              i: "u14 u15 u17 u23 u24 u25 u22".split(" "),
              j: { u15: 0, u14: 1, u22: 2 },
            },
            s27: {
              h: "uniform sampler2D u14,u15;varying vec2 vv0;void main(){vec4 a=texture2D(u14,vv0),b=texture2D(u15,vv0);gl_FragColor=a*b;}",
              i: ["u14", "u15"],
              j: { u15: 0, u14: 1 },
              C: !0,
            },
            s28: {
              h: "uniform sampler2D u1,u22;uniform float u26;varying vec2 vv0;void main(){gl_FragColor=texture2D(u22,vv0)+u26*texture2D(u1,vv0);}",
              i: ["u1", "u22", "u26"],
              j: { u1: 0, u22: 1 },
            },
            s29: {
              h: "varying vec2 vv0;uniform sampler2D u1;const vec4 f=vec4(1.,1.,1.,1.),g=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,g)*f;}",
              i: g,
              j: x,
              precision: "lowp",
            },
            s30: {
              h: "varying vec2 vv0;uniform sampler2D u1;uniform float u27;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u27)).rgb,c=texture2D(u1,vv0+vec2(u27,u27)).rgb,d=texture2D(u1,vv0+vec2(u27,0.)).rgb;gl_FragColor=vec4(dot(a,f),dot(b,f),dot(c,f),dot(d,f));}",
              i: ["u1", "u27"],
              j: x,
              precision: "lowp",
            },
            s31: {
              h: "varying vec2 vv0;uniform sampler2D u1;uniform float u27;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u27)).rgb,c=texture2D(u1,vv0+vec2(u27,u27)).rgb,d=texture2D(u1,vv0+vec2(u27,0.)).rgb;gl_FragColor=vec4(a.r,b.g,c.b,dot(d,f));}",
              i: ["u1", "u27"],
              j: x,
              precision: "lowp",
            },
            s32: {
              h: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u28))*2.,b-=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,b+=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u28))*2.,b+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),g=texture2D(u2,vv0);gl_FragColor=g.a*e.r*f;}",
              i: ["u1", "u2", "u28"],
              j: p,
              C: !0,
            },
            s33: {
              h: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float h=0.;vec2 l=k*u28,a,b;float c,d,i=0.;for(float e=-4.;e<=4.;e+=1.)for(float f=-4.;f<=4.;f+=1.)a=vec2(e,f),c=length(a)/2.,d=exp(-c*c),b=vv0+l*a,h+=d*texture2D(u1,b).r,i+=d;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,b).r-h/i)*j;}",
              i: ["u1", "u2", "u28"],
              j: p,
              C: !0,
            },
            s34: {
              h: "uniform sampler2D u3;uniform vec2 u8;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 g=vec2(.5,.5),h=vec2(1.,0.),i=vec2(0.,1.);void main(){vec2 a=vv0-u8*g;vec4 b=texture2D(u3,a),c=texture2D(u3,a+u8*h),d=texture2D(u3,a+u8*i),j=texture2D(u3,a+u8),k=e(b,c),l=e(d,j);gl_FragColor=e(k,l);}",
              i: ["u3", "u8"],
              j: H,
            },
            s35: {
              h: "uniform sampler2D u3;uniform vec2 u8;varying vec2 vv0;const vec2 k=vec2(1.,0.),l=vec2(0.,1.),m=vec2(2.,0.),n=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u3,a),c=texture2D(u3,a+u8*k),d=texture2D(u3,a+u8*l),g=texture2D(u3,a+u8),h=e(b,c),i=e(d,g);return e(h,i);}void main(){vec2 a=vv0+u8*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u8*m),d=f(a+u8*2.),g=f(a+u8*n),h=e(b,c),i=e(d,g);gl_FragColor=e(h,i);}",
              i: ["u3", "u8"],
              j: H,
              C: !0,
            },
            s36: {
              h: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}",
              i: ["u1"],
              j: x,
              precision: "lowp",
              C: !0,
            },
            s37: {
              h: "uniform sampler2D u1;uniform vec2 u8;varying vec2 vv0;const float e=15444.;void main(){vec4 a=1001./e*texture2D(u1,vv0-3.*u8)+2002./e*texture2D(u1,vv0-2.*u8)+3003./e*texture2D(u1,vv0-u8)+3432./e*texture2D(u1,vv0)+3003./e*texture2D(u1,vv0+u8)+2002./e*texture2D(u1,vv0+2.*u8)+1001./e*texture2D(u1,vv0+3.*u8);gl_FragColor=a;}",
              i: ["u8", "u1"],
              j: x,
              precision: "lowp",
              C: !0,
            },
            s38: {
              h: "uniform sampler2D u1,u11,u29;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);const float g=.1;void main(){vec4 a=texture2D(u11,vv0),b=texture2D(u29,vv0),c=texture2D(u1,vv0),d=max(f*g,b-a*a),h=sqrt(d);gl_FragColor=(c-a)/h;}",
              i: ["u1", "u11", "u29"],
              j: { u1: 0, u11: 1, u29: 2 },
              C: !0,
            },
          },
          N = {
            s39: {
              h: "uniform float u17,u30;uniform sampler2D u14,u15,u22;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-5,1e-5);void main(){vec4 sum=texture2D(u22,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u17,xyTo=floor(vv0*u17+eps2);float weightSize=toSparsity*u17;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u30*(xyPatch-halfFromSparsity))/u17,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u14,uvWeight)*texture2D(u15,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}",
              i: ["u17", "u14", "u15", "u22", "u30"],
              yb: ["1.1111", "gl_FragColor\\*=2.2222;"],
            },
            s40: {
              h: "uniform float u17,u30,u25;uniform sampler2D u14,u15,u22;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u22,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u25,xyTo=floor(vv0*u17+eps2);float weightSize=fromSparsity*u25;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u17;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u30*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u25,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u14,uvWeight)*texture2D(u15,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}",
              i: "u17 u25 u14 u15 u22 u30".split(" "),
              yb: ["1.1111", "gl_FragColor\\*=2.2222;", "3.3333"],
            },
          },
          z = null,
          J = null,
          M = {
            nb: function () {
              return C;
            },
            A: function () {
              if (!C) {
                z = mb.Kb(I, 2);
                J = mb.Kb(N, 2);
                E = "highp";
                for (var u in z) d(b, z[u], u);
                A.set("s0");
                b.enableVertexAttribArray(0);
                C = !0;
              }
            },
            Qc: function (u) {
              u.forEach(function (f) {
                M.Pc(f);
              });
            },
            Pc: function (u) {
              z[u.id] = u;
              d(b, u, u.id);
            },
            sd: function (u, f, y) {
              f || (f = u);
              z[f] = Object.create(J[u]);
              z[f].ef = !0;
              J[u].yb &&
                J[u].yb.forEach(function (G, L) {
                  z[f].h = z[f].h.replace(new RegExp(G, "g"), y[L]);
                });
              d(b, z[f], f);
            },
            set: function (u) {
              var f = z[u];
              f.C && ((f.C = !1), d(b, f, u));
              e(f);
            },
            Ra: function (u) {
              return m(u, n(), "s41");
            },
            wc: function (u) {
              return m(
                u,
                {
                  h: "void main(){gl_FragColor=vec4(.5,.5,.5,.5);}",
                  i: [],
                  precision: "highp",
                },
                "s42"
              );
            },
            Je: function (u) {
              return "undefined" === typeof z[u] ? !1 : z[u].qa;
            },
            R: function () {
              -1 !== r &&
                ((r = -1),
                l.Ia.forEach(function (u) {
                  0 !== u && b.disableVertexAttribArray(u);
                }));
            },
            yc: function () {
              var u = 0;
              l.Ia.forEach(function (f, y) {
                y = l.Ha[y];
                b.vertexAttribPointer(f, y, b.FLOAT, !1, l.Hc, u);
                u += 4 * y;
              });
            },
            ad: function () {
              b.enableVertexAttribArray(0);
            },
            Ba: function () {
              M.zb(b);
            },
            zb: function (u) {
              u.vertexAttribPointer(l.Ia[0], 2, u.FLOAT, !1, 8, 0);
            },
            Xd: function (u, f) {
              b.uniform1i(l.B[u], f);
            },
            G: function (u, f) {
              b.uniform1f(l.B[u], f);
            },
            sa: function (u, f, y) {
              b.uniform2f(l.B[u], f, y);
            },
            wh: function (u, f) {
              b.uniform2fv(l.B[u], f);
            },
            Gf: function (u, f) {
              b.uniform3fv(l.B[u], f);
            },
            xh: function (u, f, y, G) {
              b.uniform3f(l.B[u], f, y, G);
            },
            yh: function (u, f, y, G, L) {
              b.uniform4f(l.B[u], f, y, G, L);
            },
            xc: function (u, f) {
              b.uniform4fv(l.B[u], f);
            },
            zh: function (u, f) {
              b.uniformMatrix2fv(l.B[u], !1, f);
            },
            Ah: function (u, f) {
              b.uniformMatrix3fv(l.B[u], !1, f);
            },
            Bh: function (u, f) {
              b.uniformMatrix4fv(l.B[u], !1, f);
            },
            T: function (u, f) {
              M.set(u);
              f.forEach(function (y) {
                switch (y.type) {
                  case "4f":
                    b.uniform4fv(l.B[y.name], y.value);
                    break;
                  case "3f":
                    b.uniform3fv(l.B[y.name], y.value);
                    break;
                  case "2f":
                    b.uniform2fv(l.B[y.name], y.value);
                    break;
                  case "1f":
                    b.uniform1f(l.B[y.name], y.value);
                    break;
                  case "1i":
                    b.uniform1i(l.B[y.name], y.value);
                    break;
                  case "mat2":
                    b.uniformMatrix2fv(l.B[y.name], !1, y.value);
                    break;
                  case "mat3":
                    b.uniformMatrix3fv(l.B[y.name], !1, y.value);
                    break;
                  case "mat4":
                    b.uniformMatrix4fv(l.B[y.name], !1, y.value);
                }
              });
            },
            Pg: function () {
              return "lowp";
            },
            m: function () {
              b.disableVertexAttribArray(0);
              M.R();
              for (var u in z) {
                var f = z[u];
                f.qa && ((f.qa = !1), b.deleteProgram(f.ra));
                f.ef && delete z[u];
              }
              q.forEach(function (y) {
                b.deleteShader(y);
              });
              q.splice(0);
              v = 0;
              C = !1;
              l = null;
              r = -1;
            },
          };
        return M;
      })(),
      b = null,
      Qa = (function () {
        function a(g) {
          console.log("ERROR in ContextFF: ", g);
          return !1;
        }
        function c(g) {
          function t() {
            Ca.m();
            aa.reset();
            k.getExtension("WEBGL_lose_context").loseContext();
          }
          if (
            navigator.userAgent &&
            -1 !== navigator.userAgent.indexOf("forceWebGL1")
          )
            return !1;
          var x = document.createElement("canvas");
          x.setAttribute("width", 5);
          x.setAttribute("height", 5);
          var k = null;
          try {
            k = x.getContext("webgl2", g);
          } catch (p) {
            return !1;
          }
          if (!k) return !1;
          d(k);
          aa.bd(k);
          g = aa.Lb(k);
          if (!g.ja && !g.ka) return t(), !1;
          g = Ca.Tc(k, g);
          t();
          return g ? !0 : !1;
        }
        function d(g) {
          g.clearColor(0, 0, 0, 0);
          g.disable(g.DEPTH_TEST);
          g.disable(g.BLEND);
          g.disable(g.DITHER);
          g.disable(g.STENCIL_TEST);
          g.disable(g.CULL_FACE);
          g.GENERATE_MIPMAP_HINT && g.hint(g.GENERATE_MIPMAP_HINT, g.FASTEST);
          g.disable(g.SAMPLE_ALPHA_TO_COVERAGE);
          g.disable(g.SAMPLE_COVERAGE);
          g.depthFunc(g.LEQUAL);
          g.clearDepth(1);
        }
        var e = null,
          m = null,
          n = null,
          q = null,
          r = !0,
          l = null,
          v = null,
          C = [],
          E = {
            F: function () {
              return e.width;
            },
            U: function () {
              return e.height;
            },
            Gg: function () {
              return e;
            },
            Eg: function () {
              return b;
            },
            la: function () {
              return r;
            },
            flush: function () {
              b.flush();
            },
            Pe: function () {
              l || (l = new Uint8Array(e.width * e.height * 4));
              b.readPixels(0, 0, e.width, e.height, b.RGBA, b.UNSIGNED_BYTE, l);
              return l;
            },
            Ig: function () {
              return e.toDataURL("image/jpeg");
            },
            Jg: function () {
              va.P();
              m ||
                ((m = document.createElement("canvas")),
                (n = m.getContext("2d")));
              m.width = e.width;
              m.height = e.height;
              for (
                var g = E.Pe(),
                  t = n.createImageData(m.width, m.height),
                  x = m.width,
                  k = m.height,
                  p = t.data,
                  H = 0;
                H < k;
                ++H
              )
                for (var I = k - H - 1, N = 0; N < x; ++N) {
                  var z = 4 * (H * x + N),
                    J = 4 * (I * x + N);
                  p[z] = g[J];
                  p[z + 1] = g[J + 1];
                  p[z + 2] = g[J + 2];
                  p[z + 3] = g[J + 3];
                }
              n.putImageData(t, 0, 0);
              return m.toDataURL("image/png");
            },
            Hg: function (g) {
              !m &&
                g &&
                ((m = document.createElement("canvas")),
                (n = m.getContext("2d")));
              var t = g ? m : document.createElement("canvas");
              t.width = e.width;
              t.height = e.height;
              (g ? n : t.getContext("2d")).drawImage(e, 0, 0);
              return t;
            },
            A: function (g) {
              g.Ce && !g.Jb
                ? (e = document.getElementById(g.Ce))
                : g.Jb && (e = g.Jb);
              e || (e = document.createElement("canvas"));
              e.width = g && void 0 !== g.width ? g.width : 512;
              e.height = g && void 0 !== g.height ? g.height : 512;
              "undefined" === typeof g && (g = {});
              void 0 === g.premultipliedAlpha && (g.premultipliedAlpha = !1);
              void 0 === g.wd && (g.wd = !0);
              void 0 === g.antialias && (g.antialias = !1);
              if (b) r = b instanceof WebGL2RenderingContext;
              else {
                r = !0;
                var t = {
                  antialias: g.antialias,
                  alpha: !0,
                  preserveDrawingBuffer: !0,
                  premultipliedAlpha: g.premultipliedAlpha,
                  stencil: !1,
                  depth: g.wd,
                };
                navigator &&
                  navigator.userAgent &&
                  -1 !== navigator.userAgent.indexOf("noAntialiasing") &&
                  (t.antialias = !1);
                var x = c(t);
                !x && t.antialias && ((t.antialias = !1), (x = c(t)));
                x && (b = e.getContext("webgl2", t));
                b
                  ? (r = !0)
                  : ((b = e.getContext("webgl", t)) ||
                      (b = e.getContext("experimental-webgl", t)),
                    (r = !1));
              }
              if (!b) return a("WebGL1 and 2 are not enabled");
              (q = b.getExtension("WEBGL_lose_context")) &&
                g.Ld &&
                ((v = g.Ld), e.addEventListener("webglcontextlost", v, !1));
              if (!aa.A()) return a("Not enough GL capabilities");
              d(b);
              A.A();
              U.A();
              if (!Ca.Tc(b, aa.Oe())) return a("Cannot filter float textures");
              C.forEach(function (k) {
                k(b);
              });
              C.splice(0);
              return !0;
            },
            $f: function () {
              return new Promise(function (g) {
                b ? g(b) : C.push(g);
              });
            },
            m: function () {
              b && (aa.m(), A.m(), Ca.m());
              q &&
                v &&
                (e.removeEventListener("webglcontextlost", v, !1),
                (q = v = null));
              b = l = n = m = e = null;
              C.splice(0);
            },
          };
        return E;
      })(),
      xa = (function () {
        function a() {
          null === c &&
            ("undefined" !== typeof A
              ? (c = A)
              : "undefined" !== typeof JEShaders && (c = JEShaders));
        }
        var c = null;
        a();
        return {
          reset: function () {
            c = null;
          },
          Ff: function (d) {
            c !== d && (c && c.R(), (c = d));
          },
          nb: function () {
            return c.nb();
          },
          Ba: function () {
            return c.Ba();
          },
          zb: function (d) {
            return c.zb(d);
          },
          yc: function () {
            return c.yc();
          },
          R: function () {
            return c.R();
          },
          set: function (d) {
            return c.set(d);
          },
          Ra: function (d) {
            a();
            return c.Ra(d);
          },
          wc: function (d) {
            a();
            return c.wc(d);
          },
        };
      })(),
      Ba = (function () {
        function a(h) {
          b.bindTexture(b.TEXTURE_2D, h);
        }
        function c(h) {
          f[0] = h;
          h = y[0];
          var F = (h >> 16) & 32768,
            K = (h >> 12) & 2047,
            P = (h >> 23) & 255;
          return 103 > P
            ? F
            : 142 < P
            ? F | 31744 | ((255 == P ? 0 : 1) && h & 8388607)
            : 113 > P
            ? ((K |= 2048), F | ((K >> (114 - P)) + ((K >> (113 - P)) & 1)))
            : (F = (F | ((P - 112) << 10) | (K >> 1)) + (K & 1));
        }
        function d(h) {
          var F = new Uint16Array(h.length);
          h.forEach(function (K, P) {
            F[P] = c(K);
          });
          return F;
        }
        function e() {
          if (null !== G.$b) return G.$b;
          var h = n(d([0.5, 0.5, 0.5, 0.5]));
          return null === h ? !0 : (G.$b = h);
        }
        function m() {
          if (null !== G.ac) return G.ac;
          var h = n(new Uint8Array([127, 127, 127, 127]));
          return null === h ? !0 : (G.ac = h);
        }
        function n(h) {
          if (!xa.nb() || !k) return null;
          var F = null,
            K = Math.sqrt(h.length / 4);
          try {
            var P = b.getError();
            if ("FUCKING_BIG_ERROR" === P) return !1;
            F = L.instance({ isFloat: !1, S: !0, array: h, width: K });
            P = b.getError();
            if (P !== b.NO_ERROR) return !1;
          } catch (ra) {
            return !1;
          }
          la.P();
          b.viewport(0, 0, K, K);
          b.clearColor(0, 0, 0, 0);
          b.clear(b.COLOR_BUFFER_BIT);
          xa.set("s0");
          F.Rc(0);
          ma.l(!0, !0);
          h = 4 * K * K;
          P = new Uint8Array(h);
          b.readPixels(0, 0, K, K, b.RGBA, b.UNSIGNED_BYTE, P);
          K = !0;
          for (var da = 0; da < h; ++da) K = K && 3 > Math.abs(P[da] - 127);
          F.remove();
          la.ha();
          return K;
        }
        var q = 0,
          r = null,
          l = 0,
          v = null,
          C = null,
          E = null,
          g = null,
          t = null,
          x = null,
          k = !1,
          p = [],
          H = {
            isFloat: !1,
            isPot: !0,
            isLinear: !1,
            isMipmap: !1,
            isAnisotropicFiltering: !1,
            isMirrorX: !1,
            isMirrorY: !1,
            isSrgb: !1,
            isKeepArray: !1,
            isFlipY: null,
            width: 0,
            height: 0,
            url: null,
            array: null,
            data: null,
            I: null,
            Zb: null,
            df: !1,
            S: !1,
            oa: null,
            sb: 4,
            ic: 0,
          },
          I = !1,
          N = null,
          z = null,
          J = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
          ],
          M = !1,
          u = !1,
          f = new Float32Array(1),
          y = new Int32Array(f.buffer),
          G = { $b: null, ac: null },
          L = {
            A: function () {
              k ||
                ((t = [b.RGBA, null, b.RGBA, b.RGBA]),
                (x = [b.RGBA, null, b.RGBA, b.RGBA]),
                (r = [
                  b.TEXTURE0,
                  b.TEXTURE1,
                  b.TEXTURE2,
                  b.TEXTURE3,
                  b.TEXTURE4,
                  b.TEXTURE5,
                  b.TEXTURE6,
                  b.TEXTURE7,
                ]),
                (M = "undefined" !== typeof JEContext),
                (u = "undefined" !== typeof aa),
                M && JEContext.gh() && r.push(b.TEXTURE8, b.TEXTURE9),
                (v = [-1, -1, -1, -1, -1, -1, -1, -1]),
                (g = [b.UNSIGNED_BYTE, b.FLOAT, b.FLOAT]),
                (k = !0));
            },
            af: function () {
              if (!C) {
                for (var h = new Float32Array(16384), F = 0; 16384 > F; ++F)
                  h[F] = 2 * Math.random() - 1;
                C = {
                  random: L.instance({
                    isFloat: !0,
                    isPot: !0,
                    array: h,
                    width: 64,
                  }),
                  de: L.instance({
                    isFloat: !1,
                    isPot: !0,
                    width: 1,
                    array: new Uint8Array([0, 0, 0, 0]),
                  }),
                };
              }
              L.Sf();
            },
            Xg: function () {
              return C.de;
            },
            Sf: function () {
              g[1] = aa.Vb(b);
            },
            Df: function () {
              x = t = [b.RGBA, b.RGBA, b.RGBA, b.RGBA];
            },
            Sd: function (h) {
              A.set("s1");
              la.P();
              var F = h.F(),
                K = h.U();
              b.viewport(0, 0, F, K);
              h.g(0);
              ma.l(!1, !1);
            },
            mh: function (h, F) {
              L.Sd(h);
              b.readPixels(0, 0, h.F(), h.U(), b.RGBA, b.UNSIGNED_BYTE, F);
            },
            nh: function (h, F) {
              L.Sd(h);
              return aa.xb(0, 0, h.F(), h.U(), F);
            },
            kd: function (h, F, K, P, da, ra, za) {
              h.activeTexture(h.TEXTURE0);
              var w = h.createTexture();
              h.bindTexture(h.TEXTURE_2D, w);
              da = da instanceof Float32Array ? da : new Float32Array(da);
              h.texParameteri(h.TEXTURE_2D, h.TEXTURE_WRAP_S, h.CLAMP_TO_EDGE);
              h.texParameteri(h.TEXTURE_2D, h.TEXTURE_WRAP_T, h.CLAMP_TO_EDGE);
              h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MAG_FILTER, h.NEAREST);
              h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MIN_FILTER, h.NEAREST);
              h.pixelStorei(h.UNPACK_FLIP_Y_WEBGL, ra);
              h.texImage2D(
                h.TEXTURE_2D,
                0,
                h.RGBA,
                K,
                P,
                0,
                h.RGBA,
                h.FLOAT,
                da
              );
              h.bindTexture(h.TEXTURE_2D, null);
              h.pixelStorei(h.UNPACK_FLIP_Y_WEBGL, !1);
              za && (la.ha(), A.Ra(h));
              h.viewport(0, 0, K, P);
              h.framebufferTexture2D(
                h.FRAMEBUFFER,
                h.COLOR_ATTACHMENT0,
                h.TEXTURE_2D,
                F,
                0
              );
              h.bindTexture(h.TEXTURE_2D, w);
              za ? ma.l(!0, !0) : U.ab(h);
              h.deleteTexture(w);
              k && ((v[0] = -1), (E = null), (q = 0));
            },
            Fb: function (h) {
              h !== q && (b.activeTexture(r[h]), (q = h));
            },
            instance: function (h) {
              function F() {
                R = void 0 !== w.I.videoWidth ? w.I.videoWidth : w.I.width;
                T = void 0 !== w.I.videoHeight ? w.I.videoHeight : w.I.height;
              }
              function K(D) {
                var S = b.getError();
                if ("FUCKING_BIG_ERROR" === S) return !1;
                b.texImage2D(b.TEXTURE_2D, 0, ja, fa, ha, D);
                S = b.getError();
                S !== b.NO_ERROR &&
                  fa !== b.RGBA &&
                  ((fa = b.RGBA), b.texImage2D(b.TEXTURE_2D, 0, ja, fa, ha, D));
                return !0;
              }
              function P() {
                if (!Ab) {
                  a(ta);
                  Aa && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, Aa);
                  w.isPot
                    ? (b.texParameteri(
                        b.TEXTURE_2D,
                        b.TEXTURE_WRAP_S,
                        w.isMirrorX ? b.MIRRORED_REPEAT : b.REPEAT
                      ),
                      b.texParameteri(
                        b.TEXTURE_2D,
                        b.TEXTURE_WRAP_T,
                        w.isMirrorY ? b.MIRRORED_REPEAT : b.REPEAT
                      ))
                    : (b.texParameteri(
                        b.TEXTURE_2D,
                        b.TEXTURE_WRAP_S,
                        b.CLAMP_TO_EDGE
                      ),
                      b.texParameteri(
                        b.TEXTURE_2D,
                        b.TEXTURE_WRAP_T,
                        b.CLAMP_TO_EDGE
                      ));
                  w.isAnisotropicFiltering &&
                    "undefined" !== typeof JESETTINGS &&
                    b.texParameterf(
                      b.TEXTURE_2D,
                      JEContext.Kg().TEXTURE_MAX_ANISOTROPY_EXT,
                      JESETTINGS.Wf
                    );
                  b.texParameteri(
                    b.TEXTURE_2D,
                    b.TEXTURE_MAG_FILTER,
                    w.isLinear ? b.LINEAR : b.NEAREST
                  );
                  w.isLinear
                    ? b.texParameteri(
                        b.TEXTURE_2D,
                        b.TEXTURE_MIN_FILTER,
                        w.isMipmap && !Ka ? b.NEAREST_MIPMAP_LINEAR : b.LINEAR
                      )
                    : b.texParameteri(
                        b.TEXTURE_2D,
                        b.TEXTURE_MIN_FILTER,
                        w.isMipmap && !Ka ? b.NEAREST_MIPMAP_NEAREST : b.NEAREST
                      );
                  fa = t[w.sb - 1];
                  ja = x[w.sb - 1];
                  ha = g[nb];
                  if (aa.la()) {
                    var D = aa.Re();
                    fa === b.RGBA && ha === b.FLOAT
                      ? w.isMipmap || w.isLinear
                        ? (ja = Ca.Te(b))
                        : aa.Uc()
                        ? D && (ja = D)
                        : (ja = b.RGBA16F || b.RGBA)
                      : fa === b.RGB &&
                        ha === b.FLOAT &&
                        D &&
                        ((ja = D), (fa = b.RGBA));
                  }
                  if (
                    (w.S && !w.isFloat) ||
                    (w.isFloat && w.isMipmap && Ca.hf())
                  )
                    (ja = aa.Se()), (ha = aa.Vb(b));
                  w.ic && (ab = w.ic);
                  w.isSrgb && 4 === w.sb && (fa = JEContext.Vg());
                  if (w.I) K(w.I);
                  else if (w.url) K(Ga);
                  else if (ua) {
                    D = ua;
                    try {
                      "FUCKING_BIG_ERROR" !== b.getError() &&
                        (b.texImage2D(b.TEXTURE_2D, 0, ja, R, T, 0, fa, ha, D),
                        b.getError() !== b.NO_ERROR &&
                          (b.texImage2D(
                            b.TEXTURE_2D,
                            0,
                            ja,
                            R,
                            T,
                            0,
                            fa,
                            ha,
                            null
                          ),
                          b.getError() !== b.NO_ERROR &&
                            b.texImage2D(
                              b.TEXTURE_2D,
                              0,
                              b.RGBA,
                              R,
                              T,
                              0,
                              b.RGBA,
                              b.UNSIGNED_BYTE,
                              null
                            )));
                    } catch (hc) {
                      b.texImage2D(b.TEXTURE_2D, 0, ja, R, T, 0, fa, ha, null);
                    }
                    w.isKeepArray || (ua = null);
                  } else
                    (D = b.getError()),
                      "FUCKING_BIG_ERROR" !== D &&
                        (b.texImage2D(
                          b.TEXTURE_2D,
                          0,
                          ja,
                          R,
                          T,
                          0,
                          fa,
                          ha,
                          null
                        ),
                        (D = b.getError()),
                        D !== b.NO_ERROR &&
                          ((fa = b.RGBA),
                          w.S &&
                            ha !== b.FLOAT &&
                            ((ha = b.FLOAT),
                            b.texImage2D(
                              b.TEXTURE_2D,
                              0,
                              ja,
                              R,
                              T,
                              0,
                              fa,
                              ha,
                              null
                            ))));
                  if (w.isMipmap)
                    if (!Ka && ca) ca.Ub(), (bb = !0);
                    else if (Ka) {
                      D = Math.log2(Math.min(R, T));
                      Ra = Array(1 + D);
                      Ra[0] = ta;
                      for (var S = 1; S <= D; ++S) {
                        var ka = Math.pow(2, S),
                          V = R / ka;
                        ka = T / ka;
                        var La = b.createTexture();
                        a(La);
                        b.texParameteri(
                          b.TEXTURE_2D,
                          b.TEXTURE_MIN_FILTER,
                          b.NEAREST
                        );
                        b.texParameteri(
                          b.TEXTURE_2D,
                          b.TEXTURE_MAG_FILTER,
                          b.NEAREST
                        );
                        b.texImage2D(
                          b.TEXTURE_2D,
                          0,
                          ja,
                          V,
                          ka,
                          0,
                          fa,
                          ha,
                          null
                        );
                        a(null);
                        Ra[S] = La;
                      }
                      bb = !0;
                    }
                  a(null);
                  v[q] = -1;
                  Aa && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
                  Ta = !0;
                  w.oa && ca && (w.oa(ca), (w.oa = null));
                }
              }
              function da() {
                for (var D = R * T, S = 2 * D, ka = 3 * D, V = 0; V < D; ++V)
                  (ya[0][V] = Ua[V]),
                    (ya[1][V] = Ua[V + D]),
                    (ya[2][V] = Ua[V + S]),
                    (ya[3][V] = Ua[V + ka]);
              }
              function ra() {
                var D = R * T * 4;
                Da = [
                  new Uint8Array(D),
                  new Uint8Array(D),
                  new Uint8Array(D),
                  new Uint8Array(D),
                ];
                ya = [
                  new Float32Array(Da[0].buffer),
                  new Float32Array(Da[1].buffer),
                  new Float32Array(Da[2].buffer),
                  new Float32Array(Da[3].buffer),
                ];
                cb = new Uint8Array(4 * D);
                Ua = new Float32Array(cb.buffer);
                Va = !0;
              }
              function za() {
                Ea.Gb = new Uint8Array(R * T * 4);
                Ea.ld = new Float32Array(Ea.buffer);
                Ea.Y = !0;
              }
              var w = Object.assign({}, H, h),
                Wa = l++;
              null === w.isFlipY && (w.isFlipY = w.url || w.array ? !0 : !1);
              w.data &&
                ((w.array =
                  "string" === typeof w.data
                    ? Ib(w.data)
                    : w.isFloat
                    ? new Float32Array(w.data)
                    : new Uint8Array(w.data)),
                (w.isFlipY = !1));
              var nb = 0,
                Bb = w.I ? !0 : !1,
                Xa = null,
                ob = null,
                Cb = !1,
                pb = null;
              w.S = w.S || w.isFloat;
              w.S && (nb = 1);
              !w.df && w.isFloat && u && !aa.Uc() && (w.isFloat = !1);
              w.isFloat && (nb = 2);
              w.isAnisotropicFiltering &&
                M &&
                !JEContext.$g() &&
                (w.isAnisotropicFiltering = !1);
              var ta = w.Zb || b.createTexture(),
                Ga = null,
                ua = !1,
                R = 0,
                T = 0,
                Ta = !1,
                Ab = !1,
                Va = !1,
                ya = null,
                Da = null,
                cb = null,
                Ua = null,
                ja = null,
                fa = null,
                ha = null,
                Aa = w.isFlipY,
                Wb = (h = w.S && w.isMipmap) && Ca.te(),
                Ka = h && Wb ? !0 : !1,
                Ra = null,
                ab = -1,
                bb = !1,
                Ea = { Y: !1, Gb: null, ld: null };
              w.width && ((R = w.width), (T = w.height ? w.height : R));
              var ca = {
                get: function () {
                  return ta;
                },
                F: function () {
                  return R;
                },
                U: function () {
                  return T;
                },
                Yg: function () {
                  return w.url;
                },
                ah: function () {
                  return w.isFloat;
                },
                dh: function () {
                  return w.S;
                },
                eh: function () {
                  return w.isLinear;
                },
                Ub: function () {
                  b.generateMipmap(b.TEXTURE_2D);
                },
                re: function (D, S) {
                  Ka
                    ? (D || (D = ca.pd()), L.Fb(S), a(Ra[D]), (v[S] = -1))
                    : ca.g(S);
                },
                pd: function () {
                  -1 === ab && (ab = Math.log(R) / Math.log(2));
                  return ab;
                },
                Le: function (D) {
                  if (Ka) {
                    D || (D = ca.pd());
                    A.set("s12");
                    L.Fb(0);
                    for (var S = R, ka = T, V = 1; V <= D; ++V)
                      (S /= 2),
                        (ka /= 2),
                        A.sa("u8", 0.25 / S, 0.25 / ka),
                        b.viewport(0, 0, S, ka),
                        a(Ra[V - 1]),
                        b.framebufferTexture2D(
                          la.eb(),
                          b.COLOR_ATTACHMENT0,
                          b.TEXTURE_2D,
                          Ra[V],
                          0
                        ),
                        ma.l(!1, 1 === V);
                    v[0] = -1;
                  } else ca.Ub();
                },
                vh: function (D) {
                  (Bb = !Ub.Mf(D)) ? ((ua = null), (w.I = D), F()) : (ua = D);
                },
                g: function (D) {
                  if (!Ta) return !1;
                  L.Fb(D);
                  if (v[D] === Wa) return !1;
                  a(ta);
                  v[D] = Wa;
                  return !0;
                },
                Rc: function (D) {
                  b.activeTexture(r[D]);
                  q = D;
                  a(ta);
                  v[D] = Wa;
                },
                u: function () {
                  E = ca;
                  b.framebufferTexture2D(
                    la.eb(),
                    b.COLOR_ATTACHMENT0,
                    b.TEXTURE_2D,
                    ta,
                    0
                  );
                },
                da: function () {
                  E = ca;
                  b.viewport(0, 0, R, T);
                  b.framebufferTexture2D(
                    la.eb(),
                    b.COLOR_ATTACHMENT0,
                    b.TEXTURE_2D,
                    ta,
                    0
                  );
                },
                Fc: L.Fc,
                resize: function (D, S) {
                  R = D;
                  T = S;
                  P();
                },
                clone: function (D) {
                  D = L.instance({
                    width: R,
                    height: T,
                    S: w.S,
                    isFloat: w.isFloat,
                    isLinear: w.isLinear,
                    isMirrorY: w.isMirrorY,
                    isFlipY: D ? !Aa : Aa,
                    isPot: w.isPot,
                  });
                  xa.set("s0");
                  la.ha();
                  D.u();
                  b.viewport(0, 0, R, T);
                  ca.g(0);
                  ma.l(!0, !0);
                  return D;
                },
                Hf: function () {
                  b.viewport(0, 0, R, T);
                },
                remove: function () {
                  b.deleteTexture(ta);
                  Ab = !0;
                  p.splice(p.indexOf(ca), 1);
                  ca = null;
                },
                refresh: function () {
                  ca.Rc(0);
                  Aa && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0);
                  Bb
                    ? b.texImage2D(b.TEXTURE_2D, 0, ja, fa, ha, w.I)
                    : b.texImage2D(b.TEXTURE_2D, 0, ja, R, T, 0, fa, ha, ua);
                  Aa && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
                },
                Rd: function () {
                  Va || ra();
                  b.readPixels(0, 0, R, 4 * T, b.RGBA, b.UNSIGNED_BYTE, cb);
                  da();
                  return ya;
                },
                xf: function () {
                  Va || ra();
                  return aa.xb(0, 0, R, 4 * T, cb).then(function () {
                    da();
                    return ya;
                  });
                },
                zf: function () {
                  Ea.Y || za();
                  b.readPixels(0, 0, R, T, b.RGBA, b.UNSIGNED_BYTE, Ea.Gb);
                  return Ea.ld;
                },
                yf: function () {
                  Ea.Y || za();
                  return aa.xb(0, 0, R, T, Ea.Gb);
                },
                Zc: function (D) {
                  la.P();
                  A.set("s13");
                  ca.g(0);
                  if (D)
                    b.viewport(0, 0, R, T),
                      A.xc("u9", 0.25, 0.25, 0.25, 0.25),
                      ma.l(!1, !0);
                  else
                    for (D = 0; 4 > D; ++D)
                      b.viewport(0, T * D, R, T),
                        A.xc("u9", J[D]),
                        ma.l(!1, 0 === D);
                },
                Rf: function (D) {
                  var S = ha === g[0] && !m();
                  a(ta);
                  Aa && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0);
                  S
                    ? (Cb ||
                        ((Xa = document.createElement("canvas")),
                        (Xa.width = R),
                        (Xa.height = T),
                        (ob = Xa.getContext("2d")),
                        (pb = ob.createImageData(R, T)),
                        (Cb = !0)),
                      pb.data.set(D),
                      ob.putImageData(pb, 0, 0),
                      b.texImage2D(b.TEXTURE_2D, 0, ja, fa, ha, Xa))
                    : b.texImage2D(b.TEXTURE_2D, 0, ja, R, T, 0, fa, ha, D);
                  v[q] = Wa;
                  Aa && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
                },
                Gh: function (D, S) {
                  a(ta);
                  S && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0);
                  b.texImage2D(b.TEXTURE_2D, 0, ja, fa, ha, D);
                  v[q] = Wa;
                  S && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
                },
                th: function (D, S) {
                  var ka = R * T,
                    V = 4 * ka;
                  D = w.S ? (D ? "RGBE" : "JSON") : "RGBA";
                  S && (D = S);
                  S = aa.la() && !1;
                  var La = null;
                  switch (D) {
                    case "RGBE":
                      La = "s43";
                      break;
                    case "JSON":
                      La = S ? "s0" : "s13";
                      break;
                    case "RGBA":
                    case "RGBAARRAY":
                      La = "s7";
                  }
                  Va ||
                    ("RGBA" === D || "RGBE" === D || "RGBAARRAY" === D
                      ? ((Da = new Uint8Array(V)), (Va = !0))
                      : "JSON" !== D || S || ra());
                  la.P();
                  A.set(La);
                  ca.g(0);
                  V = null;
                  if ("RGBA" === D || "RGBE" === D || "RGBAARRAY" === D) {
                    b.viewport(0, 0, R, T);
                    ma.l(!0, !0);
                    b.readPixels(0, 0, R, T, b.RGBA, b.UNSIGNED_BYTE, Da);
                    if ("RGBAARRAY" === D) return { data: Da };
                    I ||
                      ((N = document.createElement("canvas")),
                      (z = N.getContext("2d")),
                      (I = !0));
                    N.width = R;
                    N.height = T;
                    ka = z.createImageData(R, T);
                    ka.data.set(Da);
                    z.putImageData(ka, 0, 0);
                    V = N.toDataURL("image/png");
                  } else if ("JSON" === D)
                    if (S)
                      (V = new Float32Array(ka)),
                        b.viewport(0, 0, R, T),
                        ma.l(!0, !0),
                        b.readPixels(0, 0, R, T, b.RGBA, b.FLOAT, V);
                    else {
                      for (V = 0; 4 > V; ++V)
                        b.viewport(0, T * V, R, T),
                          A.xc("u9", J[V]),
                          ma.l(!V, !V);
                      ca.Rd();
                      V = Array(ka);
                      for (S = 0; S < ka; ++S)
                        (V[4 * S] = ya[0][S]),
                          (V[4 * S + 1] = ya[1][S]),
                          (V[4 * S + 2] = ya[2][S]),
                          (V[4 * S + 3] = ya[3][S]);
                    }
                  return {
                    format: D,
                    data: V,
                    width: R,
                    height: T,
                    isMirrorY: w.isMirrorY,
                    isFlipY: "RGBA" === D ? w.isFlipY : !w.isFlipY,
                  };
                },
              };
              w.isMipmap && !Ka && Ta && !bb && (ca.Ub(), (bb = !0));
              if (w.url)
                a(ta),
                  b.texImage2D(
                    b.TEXTURE_2D,
                    0,
                    b.RGBA,
                    1,
                    1,
                    0,
                    b.RGBA,
                    b.UNSIGNED_BYTE,
                    null
                  ),
                  (Ga = new Image()),
                  (Ga.jg = "Anonymous"),
                  (Ga.crossOrigin = "Anonymous"),
                  (Ga.src = w.url),
                  (Ga.onload = function () {
                    R = Ga.width;
                    T = Ga.height;
                    P();
                  });
              else if (w.I) {
                var Db = function () {
                  F();
                  R ? P() : setTimeout(Db, 1);
                };
                Db();
              } else
                w.array
                  ? (w.S && !w.isFloat
                      ? w.array instanceof Uint16Array
                        ? ((ua = w.array), P())
                        : e()
                        ? ((ua = d(w.array)), P())
                        : (P(), L.kd(b, ta, ca.F(), ca.U(), w.array, Aa, !0))
                      : ((ua = w.isFloat
                          ? w.array instanceof Float32Array
                            ? w.array
                            : new Float32Array(w.array)
                          : w.array instanceof Uint8Array
                          ? w.array
                          : new Uint8Array(w.array)),
                        P()),
                    w.isKeepArray ||
                      (ua && ua !== w.array && (ua = null), delete w.array))
                  : w.Zb
                  ? (Ta = !0)
                  : P();
              ca.Ug = ca.F;
              w.oa && Ta && (w.oa(ca), (w.oa = null));
              p.push(ca);
              return ca;
            },
            P: function (h) {
              h !== q && (b.activeTexture(r[h]), (q = h));
              v[h] = -1;
              a(null);
            },
            Zf: function (h) {
              C.random.g(h);
            },
            Fc: function () {
              E = null;
              b.framebufferTexture2D(
                la.eb(),
                b.COLOR_ATTACHMENT0,
                b.TEXTURE_2D,
                null,
                0
              );
            },
            reset: function () {
              0 !== q && b.activeTexture(r[0]);
              for (var h = 0; h < r.length; ++h) v[h] = -1;
              q = -1;
            },
            qh: function () {
              q = -1;
            },
            Of: function () {
              for (var h = 0; h < r.length; ++h) L.P(h);
            },
            md: function () {
              C && (C.random.remove(), C.de.remove());
            },
            Fh: function (h, F) {
              if ("RGBA" === h.format || "RGBE" === h.format) {
                var K = new Image();
                K.src = h.data;
                K.onload = function () {
                  L.instance({
                    isMirrorY: h.isMirrorY,
                    isFlipY: h.isFlipY,
                    isFloat: !1,
                    I: K,
                    oa: function (P) {
                      if ("RGBA" === h.format) F(P);
                      else {
                        var da = h.width,
                          ra = h.height,
                          za = L.instance({
                            isMirrorY: h.isMirrorY,
                            isFloat: !0,
                            width: da,
                            height: ra,
                            isFlipY: h.isFlipY,
                          });
                        la.ha();
                        b.viewport(0, 0, da, ra);
                        A.set("s44");
                        za.u();
                        P.g(0);
                        ma.l(!0, !0);
                        L.P(0);
                        F(za);
                        b.flush();
                        setTimeout(P.remove, 50);
                      }
                    },
                  });
                };
              } else
                "JSON" === h.format
                  ? F(
                      L.instance({
                        isFloat: !0,
                        isFlipY: h.isFlipY,
                        width: h.width,
                        height: h.height,
                        array: new Float32Array(h.data),
                      })
                    )
                  : F(!1);
            },
            ze: d,
            m: function () {
              E && (va.ha(), L.Fc(), va.P());
              L.Of();
              p.slice(0).forEach(function (h) {
                h.remove();
              });
              p.splice(0);
              k = !1;
              l = 0;
              "undefined" !== typeof Ca && Ca.m();
              C = null;
            },
          };
        return L;
      })(),
      Ob = (function () {
        return {
          instance: function (a) {
            var c = [Ba.instance(a), Ba.instance(a)],
              d = [c[1], c[0]],
              e = d,
              m = {
                Bf: function (n) {
                  e[1].u();
                  e[0].g(n);
                  m.Zd();
                },
                uh: function (n) {
                  e[1].da();
                  e[0].g(n);
                  m.Zd();
                },
                Zd: function () {
                  e = e === c ? d : c;
                },
                refresh: function () {
                  e[0].refresh();
                  e[1].refresh();
                },
                g: function (n) {
                  e[0].g(n);
                },
                Yf: function (n) {
                  e[1].g(n);
                },
                Og: function () {
                  return e[0];
                },
                Sg: function () {
                  return e[1];
                },
                remove: function () {
                  e[0].remove();
                  e[1].remove();
                  e = null;
                },
              };
            return m;
          },
        };
      })(),
      ma = (function () {
        function a(l) {
          var v = { ea: null, K: null };
          v.ea = l.createBuffer();
          l.bindBuffer(l.ARRAY_BUFFER, v.ea);
          l.bufferData(
            l.ARRAY_BUFFER,
            new Float32Array([-1, -1, 3, -1, -1, 3]),
            l.STATIC_DRAW
          );
          v.K = l.createBuffer();
          l.bindBuffer(l.ELEMENT_ARRAY_BUFFER, v.K);
          l.bufferData(
            l.ELEMENT_ARRAY_BUFFER,
            new Uint16Array([0, 1, 2]),
            l.STATIC_DRAW
          );
          return v;
        }
        var c = null,
          d = 0,
          e = !1,
          m = [],
          n = -2,
          q = -2,
          r = {
            reset: function () {
              q = n = -2;
            },
            A: function () {
              e || ((c = a(b)), r.Ja(), (e = !0));
            },
            instance: function (l) {
              var v = d++,
                C = l.K ? l.K.length : 0,
                E = "undefined" === typeof l.mode ? b.STATIC_DRAW : l.mode,
                g = b.createBuffer();
              b.bindBuffer(b.ARRAY_BUFFER, g);
              b.bufferData(
                b.ARRAY_BUFFER,
                l.ea instanceof Float32Array ? l.ea : new Float32Array(l.ea),
                E
              );
              n = v;
              var t = null,
                x = null,
                k = null;
              if (l.K) {
                t = b.createBuffer();
                b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, t);
                var p = null;
                65536 > l.K.length
                  ? ((p = Uint16Array), (x = b.UNSIGNED_SHORT), (k = 2))
                  : ((p = Uint32Array), (x = b.UNSIGNED_INT), (k = 4));
                p = l.K instanceof p ? l.K : new p(l.K);
                b.bufferData(b.ELEMENT_ARRAY_BUFFER, p, E);
                q = v;
              }
              var H = {
                se: function (I) {
                  n !== v && (b.bindBuffer(b.ARRAY_BUFFER, g), (n = v));
                  I && xa.yc();
                },
                pe: function () {
                  q !== v && (b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, t), (q = v));
                },
                bind: function (I) {
                  H.se(I);
                  H.pe();
                },
                lg: function () {
                  b.drawElements(b.TRIANGLES, C, x, 0);
                },
                mg: function (I, N) {
                  b.drawElements(b.TRIANGLES, I, x, N * k);
                },
                remove: function () {
                  b.deleteBuffer(g);
                  l.K && b.deleteBuffer(t);
                  H = null;
                },
              };
              m.push(H);
              return H;
            },
            Ja: function () {
              -1 !== n && (b.bindBuffer(b.ARRAY_BUFFER, c.ea), (n = -1));
              -1 !== q && (b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, c.K), (q = -1));
            },
            l: function (l, v) {
              l && ma.Ja();
              v && xa.Ba();
              b.drawElements(b.TRIANGLES, 3, b.UNSIGNED_SHORT, 0);
            },
            ab: function (l) {
              l = l || b;
              var v = a(l);
              l.bindBuffer(l.ARRAY_BUFFER, v.ea);
              l.bindBuffer(l.ELEMENT_ARRAY_BUFFER, v.K);
              xa.zb(l);
              l.clear(l.COLOR_BUFFER_BIT);
              l.drawElements(l.TRIANGLES, 3, l.UNSIGNED_SHORT, 0);
              l.flush();
              l.bindBuffer(l.ARRAY_BUFFER, null);
              l.bindBuffer(l.ELEMENT_ARRAY_BUFFER, null);
              l.deleteBuffer(v.ea);
              l.deleteBuffer(v.K);
              r.reset();
              e && (r.Ja(), xa.Ba());
            },
            md: function () {
              var l = b,
                v = c;
              l.deleteBuffer(v.ea);
              l.deleteBuffer(v.K);
            },
            m: function () {
              r.md();
              m.forEach(function (l) {
                l.remove();
              });
              b.bindBuffer(b.ARRAY_BUFFER, null);
              b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, null);
              r.reset();
              e = !1;
              m.splice(0);
              d = 0;
            },
          };
        return r;
      })(),
      la = (function () {
        var a = null,
          c = null,
          d = null,
          e = !1,
          m = [],
          n = { J: -2, jd: 1 },
          q = {
            nb: function () {
              return e;
            },
            A: function () {
              if (!e) {
                a = b.createFramebuffer();
                var r = aa.la();
                c =
                  r && b.DRAW_FRAMEBUFFER ? b.DRAW_FRAMEBUFFER : b.FRAMEBUFFER;
                d =
                  r && b.READ_FRAMEBUFFER ? b.READ_FRAMEBUFFER : b.FRAMEBUFFER;
                e = !0;
              }
            },
            Lg: function () {
              return c;
            },
            Ue: function () {
              return d;
            },
            eb: function () {
              return b.FRAMEBUFFER;
            },
            Tg: function () {
              return n;
            },
            Dg: function () {
              return a;
            },
            instance: function (r) {
              void 0 === r.vd && (r.vd = !1);
              var l = r.N ? r.N : null,
                v = r.width,
                C = void 0 !== r.height ? r.height : r.width,
                E = a,
                g = null,
                t = !1,
                x = !1,
                k = 0;
              l && ((v = v ? v : l.F()), (C = C ? C : l.U()));
              var p = {
                Wd: function () {
                  t || ((E = b.createFramebuffer()), (t = !0), (k = n.jd++));
                },
                je: function () {
                  p.Wd();
                  p.u();
                  g = b.createRenderbuffer();
                  b.bindRenderbuffer(b.RENDERBUFFER, g);
                  b.renderbufferStorage(
                    b.RENDERBUFFER,
                    b.DEPTH_COMPONENT16,
                    v,
                    C
                  );
                  b.framebufferRenderbuffer(
                    c,
                    b.DEPTH_ATTACHMENT,
                    b.RENDERBUFFER,
                    g
                  );
                  b.clearDepth(1);
                },
                bind: function (H, I) {
                  k !== n.J && (b.bindFramebuffer(c, E), (n.J = k));
                  l && l.u();
                  I && b.viewport(0, 0, v, C);
                  H && b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                },
                Xf: function () {
                  k !== n.J && (b.bindFramebuffer(c, E), (n.J = k));
                },
                clear: function () {
                  b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                },
                fg: function () {
                  b.clear(b.COLOR_BUFFER_BIT);
                },
                gg: function () {
                  b.clear(b.DEPTH_BUFFER_BIT);
                },
                Hf: function () {
                  b.viewport(0, 0, v, C);
                },
                u: function () {
                  k !== n.J && (b.bindFramebuffer(c, E), (n.J = k));
                },
                rtt: function (H) {
                  l = H;
                  n.J !== k && (b.bindFramebuffer(b.FRAMEBUFFER, E), (n.J = k));
                  H.u();
                },
                P: function () {
                  b.bindFramebuffer(c, null);
                  n.J = -1;
                },
                resize: function (H, I) {
                  v = H;
                  C = I;
                  g &&
                    (b.bindRenderbuffer(b.RENDERBUFFER, g),
                    b.renderbufferStorage(
                      b.RENDERBUFFER,
                      b.DEPTH_COMPONENT16,
                      v,
                      C
                    ));
                },
                remove: function () {
                  E === a ||
                    x ||
                    (b.bindFramebuffer(c, E),
                    b.framebufferTexture2D(
                      c,
                      b.COLOR_ATTACHMENT0,
                      b.TEXTURE_2D,
                      null,
                      0
                    ),
                    g &&
                      b.framebufferRenderbuffer(
                        c,
                        b.DEPTH_ATTACHMENT,
                        b.RENDERBUFFER,
                        null
                      ),
                    b.bindFramebuffer(c, null),
                    b.deleteFramebuffer(E),
                    g && b.deleteRenderbuffer(g));
                  x = !0;
                },
              };
              r.vd && p.je();
              m.push(p);
              return p;
            },
            P: function () {
              b.bindFramebuffer(c, null);
              n.J = -1;
            },
            Pf: function () {
              b.bindFramebuffer(c, null);
              b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
              b.viewport(0, 0, aa.F(), aa.U());
              n.J = -1;
            },
            reset: function () {
              n.J = -2;
            },
            ha: function () {
              0 !== n.J && (b.bindFramebuffer(c, a), (n.J = 0));
            },
            clear: function () {
              b.viewport(0, 0, aa.F(), aa.U());
              b.clear(b.COLOR_BUFFER_BIT);
            },
            m: function () {
              q.P();
              m.forEach(function (r) {
                r.remove();
              });
              null !== a && (b.deleteFramebuffer(a), (a = null));
              q.reset();
              e = !1;
              m.splice(0);
              n.jd = 1;
            },
          };
        return q;
      })(),
      aa = (function () {
        function a() {
          e = "undefined" === typeof Qa ? JEContext : Qa;
          m = !0;
        }
        function c(k, p) {
          for (var H = 0; H < k.length; ++H) {
            var I = p.getExtension(k[H]);
            if (I) return I;
          }
          return null;
        }
        function d() {
          null !== g.Cb && (clearInterval(g.Cb), (g.Cb = null));
          g.Oa = !1;
        }
        var e = null,
          m = !1,
          n = {
            xd: !1,
            Ac: null,
            Bc: null,
            Bd: !1,
            gf: !1,
            Cc: null,
            Cd: !1,
            Dc: null,
            yd: !1,
            Hb: null,
            bf: !1,
            Ib: null,
            cf: !1,
          },
          q = null,
          r = { ja: !0, ka: !0, Tb: !0, Qd: !1 },
          l = null,
          v = !0,
          C = null,
          E = null,
          g = { Oa: !1, va: null, ib: null, Yb: -1, X: null, Cb: null },
          t = "undefined" === typeof window ? {} : window,
          x = {
            A: function () {
              if (m) return !0;
              x.reset();
              m || a();
              var k = b;
              if (!q.xd) {
                q.Ac = x.ed(k);
                t.GL_EXT_FLOAT = q.Ac;
                q.Bd = q.Ac ? !0 : !1;
                if (q.Bd || x.la())
                  (q.Bc = x.fd(k)),
                    (q.gf = q.Bc ? !0 : !1),
                    (t.GL_EXT_FLOATLINEAR = q.Bc);
                q.xd = !0;
              }
              if (!q.yd) {
                q.Cc = x.Za(k);
                q.Cc && ((q.Cd = !0), (t.GL_EXT_HALFFLOAT = q.Cc));
                if (q.Cd || x.la())
                  (q.Dc = x.gd(k)), (t.GL_EXT_HALFFLOATLINEAR = q.Dc);
                q.Zg = q.Dc ? !0 : !1;
                q.yd = !0;
              }
              q.Hb = x.cd(k);
              q.bf = q.Hb ? !0 : !1;
              t.GL_EXT_COLORBUFFERFLOAT = q.Hb;
              q.Ib = x.dd(k);
              q.cf = q.Ib ? !0 : !1;
              t.GL_EXT_COLORBUFFERHALFFLOAT = q.Ib;
              la.A();
              Ba.A();
              if (!x.De()) return !1;
              ma.A();
              Ba.af();
              return !0;
            },
            reset: function () {
              q = Object.assign({}, n);
              l = Object.assign({}, r);
            },
            F: function () {
              m || a();
              return e.F();
            },
            U: function () {
              m || a();
              return e.U();
            },
            la: function () {
              m || a();
              return e.la();
            },
            bd: function (k) {
              x.cd(k);
              x.dd(k);
              x.ed(k);
              x.fd(k);
              x.Za(k);
              x.gd(k);
            },
            cd: c.bind(null, [
              "EXT_color_buffer_float",
              "WEBGL_color_buffer_float",
              "OES_color_buffer_float",
            ]),
            dd: c.bind(null, [
              "EXT_color_buffer_half_float",
              "WEBGL_color_buffer_half_float",
              "OES_color_buffer_half_float",
            ]),
            ed: c.bind(null, [
              "OES_texture_float",
              "MOZ_OES_texture_float",
              "WEBKIT_OES_texture_float",
            ]),
            fd: c.bind(null, [
              "OES_texture_float_linear",
              "MOZ_OES_texture_float_linear",
              "WEBKIT_OES_texture_float_linear",
            ]),
            Za: c.bind(null, [
              "OES_texture_half_float",
              "MOZ_OES_texture_half_float",
              "WEBKIT_OES_texture_half_float",
            ]),
            gd: c.bind(null, [
              "OES_texture_half_float_linear",
              "MOZ_OES_texture_half_float_linear",
              "WEBKIT_OES_texture_half_float_linear",
            ]),
            Vb: function (k) {
              var p = x.Za(k);
              return p && p.HALF_FLOAT_OES
                ? p.HALF_FLOAT_OES
                : k.HALF_FLOAT || k.FLOAT;
            },
            Re: function () {
              return E || b.RGBA32F || b.RGBA;
            },
            Se: function () {
              return C || b.RGBA16F || b.RGBA;
            },
            Oe: function () {
              return l;
            },
            Uc: function () {
              return l.ja;
            },
            bg: function () {
              return l.ka;
            },
            ag: function () {
              return l.Tb;
            },
            ue: function () {
              return l.Qd && v;
            },
            be: function (k) {
              v = k;
              !k &&
                g.Oa &&
                (b.deleteSync(g.ib), b.bindBuffer(g.X, null), (g.Oa = !1));
            },
            Ab: function (k, p, H) {
              function I() {
                k.bindTexture(k.TEXTURE_2D, null);
                k.bindFramebuffer(N, null);
                k.deleteTexture(M);
                k.deleteFramebuffer(J);
              }
              var N = k.FRAMEBUFFER,
                z = k.NEAREST,
                J = k.createFramebuffer();
              k.bindFramebuffer(N, J);
              var M = k.createTexture();
              k.activeTexture(k.TEXTURE0);
              k.bindTexture(k.TEXTURE_2D, M);
              k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, !1);
              k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_S, k.CLAMP_TO_EDGE);
              k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_T, k.CLAMP_TO_EDGE);
              k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MAG_FILTER, z);
              k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MIN_FILTER, z);
              k.texImage2D(k.TEXTURE_2D, 0, p, 3, 3, 0, k.RGBA, H, null);
              k.framebufferTexture2D(
                k.FRAMEBUFFER,
                k.COLOR_ATTACHMENT0,
                k.TEXTURE_2D,
                M,
                0
              );
              if (
                k.checkFramebufferStatus(
                  k.READ_FRAMEBUFFER || k.FRAMEBUFFER
                ) !== k.FRAMEBUFFER_COMPLETE
              )
                return I(), !1;
              xa.wc(k);
              k.clearColor(0, 0, 0, 0);
              k.viewport(0, 0, 3, 3);
              k.disable(k.DEPTH_TEST);
              k.clear(k.COLOR_BUFFER_BIT);
              ma.ab(k);
              k.bindFramebuffer(N, null);
              xa.Ra(k);
              k.activeTexture(k.TEXTURE0);
              k.bindTexture(k.TEXTURE_2D, M);
              ma.ab(k);
              p = new Uint8Array(36);
              k.readPixels(0, 0, 3, 3, k.RGBA, k.UNSIGNED_BYTE, p);
              I();
              for (H = 0; 36 > H; ++H)
                if (3 !== H % 4 && 3 < Math.abs(p[H] - 127)) return !1;
              return !0;
            },
            Lb: function (k) {
              var p = { ja: !1, ka: !1 };
              k.disable(k.BLEND);
              k.clearColor(0, 0, 0, 0);
              k.clear(k.COLOR_BUFFER_BIT);
              k.RGBA32F &&
                x.Ab(k, k.RGBA32F, k.FLOAT) &&
                ((p.ja = !0), (E = k.RGBA32F));
              !p.ja && x.Ab(k, k.RGBA, k.FLOAT) && ((p.ja = !0), (E = k.RGBA));
              var H = x.Vb(k);
              C = null;
              k.RGBA16F &&
                x.Ab(k, k.RGBA16F, H) &&
                ((p.ka = !0), (C = k.RGBA16F));
              !p.ka && x.Ab(k, k.RGBA, H) && ((p.ka = !0), (C = k.RGBA));
              return p;
            },
            Ee: function () {
              var k = la.instance({ width: 2 });
              k.Wd();
              var p = Ba.instance({ width: 2, isFloat: !0, sb: 3 });
              k.u();
              p.u();
              b.flush();
              b.checkFramebufferStatus(la.Ue()) !== b.FRAMEBUFFER_COMPLETE
                ? (Ba.Df(), (l.Tb = !1))
                : (l.Tb = !0);
              k.remove();
              p.remove();
            },
            Fe: function () {
              var k = !1;
              x.la() &&
                (k =
                  "PIXEL_PACK_BUFFER STREAM_READ SYNC_GPU_COMMANDS_COMPLETE WAIT_FAILED fenceSync deleteSync createBuffer"
                    .split(" ")
                    .every(function (p) {
                      return "undefined" !== typeof b[p];
                    }));
              l.Qd = k;
            },
            De: function () {
              var k = x.Lb(b);
              Object.assign(l, k);
              if (!l.ja && !l.ka) return !1;
              x.Ee();
              x.Fe();
              return !0;
            },
            xb: function (k, p, H, I, N) {
              if (!x.ue())
                return (
                  b.readPixels(k, p, H, I, b.RGBA, b.UNSIGNED_BYTE, N),
                  Promise.resolve(N)
                );
              null === g.va &&
                ((g.X = b.PIXEL_PACK_BUFFER),
                (g.va = b.createBuffer()),
                (g.Yb = -1));
              b.bindBuffer(g.X, g.va);
              N.byteLength !== g.Yb &&
                (b.bufferData(g.X, N.byteLength, b.STREAM_READ),
                (g.Yb = N.byteLength));
              b.readPixels(k, p, H, I, b.RGBA, b.UNSIGNED_BYTE, 0);
              g.ib = b.fenceSync(b.SYNC_GPU_COMMANDS_COMPLETE, 0);
              b.flush();
              return new Promise(function (z, J) {
                function M() {
                  if (!g.Oa) return d(), J(), !1;
                  switch (b.clientWaitSync(g.ib, 0, 0)) {
                    case b.TIMEOUT_EXPIRED:
                    case b.WAIT_FAILED:
                      return !1;
                    default:
                      return (
                        d(),
                        b.deleteSync(g.ib),
                        b.getBufferSubData(g.X, 0, N),
                        b.bindBuffer(g.X, null),
                        z(N),
                        !0
                      );
                  }
                }
                d();
                g.Oa = !0;
                M() || (g.Cb = setInterval(M, 0));
              });
            },
            m: function () {
              d();
              Ba.m();
              la.m();
              ma.m();
              null !== g.va && (b.deleteBuffer(g.va), (g.va = null));
              xa.reset();
              m = !1;
            },
          };
        return x;
      })(),
      U = ma,
      va = la,
      Y = Ba,
      Ca = (function () {
        function a(J, M, u, f) {
          p.texParameteri(
            p.TEXTURE_2D,
            p.TEXTURE_MIN_FILTER,
            f ? p.NEAREST_MIPMAP_NEAREST : p.LINEAR
          );
          var y = null;
          if (null !== u)
            try {
              y = p.getError();
              if ("FUCKING_BIG_ERROR" === y) return !1;
              p.texImage2D(p.TEXTURE_2D, 0, J, 4, 4, 0, p.RGBA, M, u);
              y = p.getError();
              if (y !== p.NO_ERROR) return !1;
            } catch (G) {
              return !1;
            }
          f && p.generateMipmap(p.TEXTURE_2D);
          p.clear(p.COLOR_BUFFER_BIT);
          U.ab(p);
          y = p.getError();
          if ("FUCKING_BIG_ERROR" === y) return !1;
          p.readPixels(0, 0, 2, 2, p.RGBA, p.UNSIGNED_BYTE, C);
          y = p.getError();
          y === p.INVALID_OPERATION &&
            "undefined" !== typeof p.PIXEL_PACK_BUFFER &&
            (p.bindBuffer(p.PIXEL_PACK_BUFFER, null),
            p.readPixels(0, 0, 2, 2, p.RGBA, p.UNSIGNED_BYTE, C),
            (y = p.getError()));
          if (y !== p.NO_ERROR) return !1;
          u = !0;
          for (f = 0; 16 > f; ++f) u = u && 4 > Math.abs(C[f] - 127);
          u && ((l.Nd = M), (l.ud = J));
          return u;
        }
        function c(J, M) {
          return H.ja && a(J, p.FLOAT, new Float32Array(E), M)
            ? ((r = q.Nc), !0)
            : !1;
        }
        function d(J, M, u) {
          if (!H.ka) return !1;
          var f = Ba.ze(E),
            y = aa.Za(p);
          if (
            (y && y.HALF_FLOAT_OES && a(J, y.HALF_FLOAT_OES, f, M)) ||
            (p.HALF_FLOAT && a(J, p.HALF_FLOAT, f, M))
          )
            return (r = q.Ga), !0;
          f = new Float32Array(E);
          if (a(J, p.FLOAT, f, M)) return (r = q.Ga), !0;
          p.bindTexture(p.TEXTURE_2D, u);
          p.texImage2D(
            p.TEXTURE_2D,
            0,
            p.RGBA,
            2,
            2,
            0,
            p.RGBA,
            p.UNSIGNED_BYTE,
            null
          );
          p.bindFramebuffer(l.Xa, z);
          Ba.kd(p, u, 2, 2, f, !1, !1);
          p.bindFramebuffer(l.Xa, null);
          p.bindTexture(p.TEXTURE_2D, u);
          return a(J, null, null, M) ? ((r = q.Ga), !0) : !1;
        }
        function e(J, M, u) {
          v = !0;
          if (d(J, !0, u) || c(M, !0)) return !0;
          v = !1;
          return d(J, !1, u) || c(M, !1) ? !0 : !1;
        }
        function m(J) {
          if (r === q.R) {
            p = J || b;
            r = q.RGBA8;
            v = !0;
            aa.bd(p);
            H || (H = aa.Lb(p));
            va.reset();
            z = p.createFramebuffer();
            l.Xa = p.DRAW_FRAMEBUFFER || p.FRAMEBUFFER;
            p.bindFramebuffer(l.Xa, null);
            p.clearColor(0, 0, 0, 0);
            p.viewport(0, 0, 2, 2);
            A.R();
            I = A.Ra(p);
            J = p.createTexture();
            p.activeTexture(p.TEXTURE0);
            p.bindTexture(p.TEXTURE_2D, J);
            p.texParameteri(p.TEXTURE_2D, p.TEXTURE_WRAP_S, p.REPEAT);
            p.texParameteri(p.TEXTURE_2D, p.TEXTURE_WRAP_T, p.REPEAT);
            p.texParameteri(p.TEXTURE_2D, p.TEXTURE_MAG_FILTER, p.NEAREST);
            N = J;
            var M = (J = p.RGBA),
              u = p.RGBA16F,
              f = p.RGBA32F;
            f && (J = f);
            u && (M = u);
            if ((u || f) && e(M, J, N)) return n(), !0;
            J = M = p.RGBA;
            if (e(M, J, N)) return n(), !0;
            r = q.RGBA8;
            n();
            return !1;
          }
        }
        function n() {
          p.deleteProgram(I.ra);
          p.deleteTexture(N);
          N = I = null;
        }
        for (
          var q = { R: -1, Nc: 3, Ga: 2, RGBA8: 0 },
            r = q.R,
            l = { Nd: null, ud: null, Xa: null },
            v = !0,
            C = new Uint8Array(16),
            E = Array(64),
            g = 0;
          4 > g;
          ++g
        )
          for (var t = 0; 4 > t; ++t) {
            var x = 0 === (t + g) % 2 ? 1 : 0,
              k = 4 * g + t;
            E[4 * k] = x;
            E[4 * k + 1] = x;
            E[4 * k + 2] = x;
            E[4 * k + 3] = x;
          }
        var p = null,
          H = null,
          I = null,
          N = null,
          z = null;
        return {
          te: function (J) {
            m(J);
            return v;
          },
          Tc: function (J, M) {
            r === q.R && (typeof ("undefined" !== M) && (H = M), m(J));
            return r !== q.RGBA8;
          },
          bh: function (J) {
            m(J);
            return r === q.Nc;
          },
          hf: function (J) {
            m(J);
            return r === q.Ga;
          },
          Mg: function (J) {
            m(J);
            return l.Nd;
          },
          Te: function (J) {
            m(J);
            return l.ud;
          },
          m: function () {
            p = null;
            v = !0;
            r = q.R;
            H = null;
          },
        };
      })(),
      Xb = (function () {
        return {
          instance: function (a) {
            var c = Y.instance(a.alpha),
              d = Y.instance(a.beta);
            return {
              He: function () {
                c.g(1);
                d.g(2);
              },
            };
          },
        };
      })(),
      Gb = (function () {
        return {
          instance: function (a) {
            var c = null,
              d = !1,
              e = !1,
              m = null,
              n = !1,
              q = !1,
              r = null,
              l = "undefined" === typeof a.preprocessing ? !1 : a.preprocessing,
              v =
                "undefined" === typeof a.preprocessingSize
                  ? a.size
                  : a.preprocessingSize;
            a.mask &&
              ((d = !0),
              ba && void 0 !== ba.oe && (a.mask = ba.oe + a.mask),
              (c = Y.instance({ isFloat: !1, url: a.mask })));
            var C = !1;
            a.customInputShader &&
              ((C = "s45"),
              A.Pc({
                name: "_",
                id: C,
                h: a.customInputShader,
                Eh: ["uSource"],
                precision: "lowp",
              }),
              A.T(C, [{ type: "1i", name: "_", value: 0 }]));
            switch (l) {
              case "sobel":
                r = "s32";
                n = !0;
                break;
              case "meanNormalization":
                r = "s33";
                n = !0;
                break;
              case "grayScale":
                r = "s29";
                n = !1;
                break;
              case "grayScaleTilt":
                r = "s30";
                q = !0;
                n = !1;
                break;
              case "rgbGrayTilt":
                r = "s31";
                q = !0;
                n = !1;
                break;
              case "copy":
                r = C ? C : "s0";
                break;
              case "inputLightRegulation":
                r = C ? C : "s29";
                m = Yb.instance({ td: v, Md: a.size, Id: a.nBlurPass, mb: !1 });
                e = !0;
                break;
              case "inputMix0":
                r = "none";
                m = Zb.instance({
                  D: v,
                  ee: a.varianceMin,
                  Sc: a.blurKernelSizePx,
                  mb: !1,
                });
                e = !0;
                break;
              case "direct":
              case "none":
                r = "abort";
                break;
              default:
                r = "s4";
            }
            q && A.T(r, [{ name: "u27", type: "1f", value: a.tilt }]);
            d && (r += "Mask");
            var E = Y.instance({ isFloat: !1, isPot: !1, width: a.size }),
              g = {
                F: function () {
                  return v;
                },
                Wb: function () {
                  return g.F();
                },
                Xe: function () {
                  return e ? m.Xb() : E;
                },
                V: function (t) {
                  va.ha();
                  "abort" !== r &&
                    ("none" !== r &&
                      (A.set(r),
                      n && A.G("u28", 1 / a.size),
                      E.da(),
                      d && c.g(1),
                      U.l(!1, !1),
                      E.g(0),
                      (t = E)),
                    e && m.process(t));
                },
                m: function () {
                  E.remove();
                  d && c.remove();
                },
              };
            return g;
          },
        };
      })(),
      Hb = (function () {
        return {
          instance: function (a) {
            function c(h) {
              m.forEach(function (F, K) {
                n[K][0] = h[0][F];
                n[K][1] = h[1][F];
                n[K][2] = h[2][F];
                n[K][3] = h[3][F];
              });
              return n;
            }
            "undefined" === typeof a.normalize && (a.normalize = !1);
            var d = {
                input: null,
                Ua: null,
                bc: null,
                ba: null,
                tb: null,
                oc: null,
                pc: null,
              },
              e = null,
              m = [],
              n = [],
              q = !1,
              r = null,
              l = !0,
              v = -1,
              C = a.isReorganize ? a.isReorganize : !1,
              E = a.kernelsCount ? !0 : !1,
              g = a.dynPelu ? Xb.instance(a.dynPelu) : !1,
              t = g ? !0 : !1,
              x = { isEnabled: !1 };
            a.ff
              ? ((a.sparsity =
                  "undefined" !== typeof a.sparsity ? a.sparsity : a.vb.Wb()),
                (l = !1))
              : "full" === a.connectivityUp && (a.sparsity = a.vb.Wb());
            var k = {
                elu: "s16",
                elu01: "s17",
                relu: "s15",
                arctan: "s19",
                sigmoid: "s14",
                copy: "s0",
                softplus: "s20",
                dynPelu: "s18",
              }[a.activation],
              p = a.sparsity * a.sparsity,
              H = !1,
              I = a.size,
              N = "";
            if (a.maxPooling) {
              switch (a.maxPooling.size) {
                case 2:
                  N = "s34";
                  break;
                case 4:
                  N = "s35";
              }
              H = !0;
              I /= a.maxPooling.size;
              d.oc = Y.instance({ isFloat: !0, isPot: !1, width: I });
            }
            var z = void 0 !== a.rf && a.rf ? !0 : !1,
              J = null,
              M = null,
              u = null;
            if (z) {
              J = "s46" + a.index.toString();
              A.sd("s46", J, [((a.normalization.n - 1) / 2).toFixed(1)]);
              A.T(J, [
                { type: "1i", name: "u1", value: 0 },
                { type: "2f", name: "u8", value: [1 / a.size, 1 / a.size] },
                { type: "1f", name: "u7", value: a.normalization.alpha },
                { type: "1f", name: "u10", value: a.normalization.beta },
                { type: "1f", name: "u31", value: a.normalization.k },
              ]);
              var f = { isFloat: !0, isPot: !0, width: a.size };
              M = Y.instance(f);
              u = Y.instance(f);
            }
            var y = -1,
              G = null;
            l && (d.ba = Y.instance({ isFloat: !0, isPot: !1, width: a.size }));
            d.Ua = Y.instance(a.bias);
            var L = {
              F: function () {
                return a.size;
              },
              Wb: function () {
                return I;
              },
              nd: function () {
                return a.classesCount;
              },
              qe: function (h) {
                e.g(h);
              },
              uf: function () {
                a.remap &&
                  a.remap.isEnabled &&
                  (x = {
                    isEnabled: !0,
                    kf: Y.instance({
                      isFloat: !1,
                      isFlipY: !1,
                      array: new Uint8Array(a.remap.maskTexture.data),
                      width: a.remap.maskTexture.width,
                      isPot: !1,
                    }),
                    pb: a.remap.layers.map(function (h) {
                      return a.parent.We(h);
                    }),
                    depth: a.remap.depth,
                  });
              },
              Ef: function () {
                switch (a.connectivityUp) {
                  case "direct":
                    G = $b.instance(a.connectivity);
                    break;
                  case "square":
                    G = ac.instance(a.connectivity);
                    break;
                  case "squareFast":
                    G = bc.instance(a.connectivity, a.activation);
                    break;
                  case "full":
                    G = cc.instance(a.connectivity);
                    break;
                  case "conv":
                    (v = a.kernelsCount),
                      (G = dc.instance(a.connectivity)),
                      C &&
                        (d.tb = Y.instance({
                          width: I,
                          isFloat: !0,
                          isFlipY: !1,
                          isPot: !1,
                        }));
                }
                if (G.Ca) {
                  var h = a.size * a.sparsity;
                  y = Math.log(h / a.size) / Math.log(2);
                  d.input = Y.instance({
                    isMipmap: !0,
                    isFloat: !0,
                    isPot: !0,
                    width: h,
                    ic: y,
                  });
                  d.bc = Y.instance({ isFloat: !0, isPot: !0, width: a.size });
                }
              },
              V: function (h, F) {
                e = h;
                G.Ca
                  ? (d.input.da(),
                    E && d.Ua.g(2),
                    G.V(x),
                    d.input.g(0),
                    d.input.Le(y),
                    d.bc.da(),
                    E ? A.set("s0") : (A.set("s28"), A.G("u26", p), d.Ua.g(1)),
                    d.input.re(y, 0),
                    U.l(!1, !1),
                    A.set(k),
                    z ? M.u() : d.ba.u(),
                    d.bc.g(0),
                    t && g.He(),
                    U.l(!1, !1))
                  : (d.ba.da(), d.Ua.g(1), G.V());
                z &&
                  (A.set(J),
                  u.u(),
                  M.g(0),
                  U.l(!1, !1),
                  A.set("s47"),
                  A.G("u7", 1),
                  d.ba.u(),
                  u.g(1),
                  U.l(!1, !1));
                if (l)
                  return (
                    H
                      ? (d.oc.da(),
                        d.ba.g(0),
                        A.set(N),
                        A.sa("u8", 1 / a.size, 1 / a.size),
                        U.l(!1, !1),
                        (F = d.oc))
                      : (F = d.ba),
                    F.g(0),
                    C &&
                      (d.tb.u(),
                      A.set("s22"),
                      A.sa("u13", v, I / v),
                      U.l(!1, !1),
                      (F = d.tb),
                      d.tb.g(0)),
                    F
                  );
                var K = d.ba;
                a.normalize &&
                  (A.set("gpuRawAvg" === q ? "s9" : "s8"),
                  A.G("u4", 1 / a.size),
                  d.pc.da(),
                  d.ba.g(0),
                  U.l(!1, !1),
                  (K = d.pc));
                h = null;
                switch (q) {
                  case "cpuRGBA2Float":
                    K.Zc(!1);
                    F ? (h = L.vf(K).then(r)) : ((K = L.wf(K)), r(K));
                    break;
                  case "cpuMeanFloat":
                    K.Zc(!0);
                    F ? (h = K.yf().then(r)) : ((K = K.zf()), r(K));
                    break;
                  case "gpuRawAvg":
                  case "gpuRaw":
                    K.g(0);
                  case "none":
                    null !== r && r(K);
                }
                F && null === h && (h = Promise.resolve());
                return h;
              },
              Be: function (h) {
                h && ((q = h.qc || "none"), (r = h.nc || null));
                d.ba = Y.instance({
                  isFloat: !0,
                  isPot: !0,
                  isMipmap: !1,
                  width: a.size,
                });
                h =
                  "undefined" !== typeof a.classesCount && a.classesCount
                    ? a.classesCount
                    : a.size * a.size;
                for (var F = 0, K = 0, P = 0; F < h; ++F)
                  m.push(K + (a.size - 1 - P) * a.size),
                    n.push([-1, -1, -1, -1]),
                    ++K,
                    K === a.size && ((K = 0), ++P);
                a.normalize &&
                  (d.pc = Y.instance({
                    isFloat: !0,
                    isPot: !0,
                    width: a.size,
                  }));
              },
              vf: function (h) {
                return h.xf().then(c);
              },
              wf: function (h) {
                h = h.Rd();
                c(h);
                return n;
              },
              m: function () {
                for (var h in d) {
                  var F = d[h];
                  F && F.remove();
                }
                G && (G.m(), (G = null));
              },
            };
            a.vb && L.Ef(a.vb);
            return L;
          },
        };
      })(),
      $b = (function () {
        return {
          instance: function (a) {
            var c = Y.instance(a.weights);
            return {
              Ca: !0,
              cb: function () {
                return 1;
              },
              m: function () {
                c.remove();
              },
              $e: function () {
                return c;
              },
              V: function () {
                A.set("s27");
                c.g(1);
                U.l(!1, !1);
              },
            };
          },
        };
      })(),
      cc = (function () {
        return {
          instance: function (a) {
            var c = a.fromLayerSize,
              d = Y.instance(a.weights);
            return {
              Ca: !0,
              cb: function () {
                return c;
              },
              m: function () {
                d.remove();
              },
              V: function (e) {
                if (e.isEnabled) {
                  A.set("s25");
                  e.kf.g(3);
                  var m,
                    n = Math.min(e.pb.length, e.depth);
                  for (m = 0; m < n; ++m) e.pb[m].qe(4 + m);
                } else A.set("s24");
                A.G("u17", a.toLayerSize);
                d.g(1);
                U.l(!1, !1);
              },
            };
          },
        };
      })(),
      ac = (function () {
        return {
          instance: function (a) {
            for (
              var c = a.fromLayerSize,
                d = a.toLayerSize,
                e = a.toSparsity,
                m = e * d,
                n = m / c,
                q = c / d,
                r = 0,
                l = 0,
                v = 0,
                C = Array(e * d * e * d * 4),
                E = Array(e * d * e * d * 4),
                g = Array(c * c),
                t = 0;
              t < g.length;
              ++t
            )
              g[t] = 0;
            t = Math.floor(e / 2);
            for (var x = 0.5 / d, k = 0.5 / c, p = 0.5 / m, H = 0; H < d; ++H)
              for (var I = Math.round(H * q), N = 0; N < d; ++N) {
                var z = Math.round(N * q),
                  J = H / d,
                  M = N / d;
                J += x;
                M += x;
                for (var u = 0; u < e; ++u) {
                  var f = I + u - t;
                  0 > f && (f += c);
                  f >= c && (f -= c);
                  for (var y = 0; y < e; ++y) {
                    var G = r / m,
                      L = l / m,
                      h = z + y - t;
                    0 > h && (h += c);
                    h >= c && (h -= c);
                    var F = f / c,
                      K = h / c;
                    L = 1 - L - 1 / m;
                    F += k;
                    K += k;
                    G += p;
                    L += p;
                    var P = H * e + u,
                      da = N * e + y;
                    da = d * e - da - 1;
                    P = da * d * e + P;
                    C[4 * P] = G;
                    C[4 * P + 1] = L;
                    C[4 * P + 2] = F;
                    C[4 * P + 3] = K;
                    K = g[h * c + f]++;
                    P = K % n;
                    F = f * n + P;
                    h = h * n + (K - P) / n;
                    h = c * n - 1 - h;
                    h = h * c * n + F;
                    E[4 * h] = G;
                    E[4 * h + 1] = L;
                    E[4 * h + 2] = J;
                    E[4 * h + 3] = M;
                    ++r >= m && ((r = 0), ++l);
                    ++v;
                  }
                }
              }
            g = null;
            var ra = Y.instance(a.weights);
            delete a.weights.data;
            var za = Y.instance({
              width: m,
              isFloat: !0,
              array: new Float32Array(E),
              isPot: !0,
            });
            E = null;
            var w = Y.instance({
              width: m,
              isFloat: !0,
              array: new Float32Array(C),
              isPot: !0,
            });
            C = null;
            return {
              Ca: !0,
              cb: function () {
                return n;
              },
              m: function () {
                za.remove();
                w.remove();
                ra.remove();
              },
              V: function () {
                A.set("s23");
                ra.g(1);
                w.g(2);
                U.l(!1, !1);
              },
            };
          },
        };
      })(),
      dc = (function () {
        return {
          instance: function (a) {
            var c = a.kernelsCount,
              d = a.toSparsity,
              e = (d * a.toLayerSize) / a.fromLayerSize,
              m = Y.instance(a.weights);
            return {
              Ca: !0,
              cb: function () {
                return e;
              },
              Wg: function () {
                return d;
              },
              $e: function () {
                return m;
              },
              m: function () {
                m.remove();
              },
              V: function () {
                A.set("s26");
                A.G("u23", c);
                A.G("u24", d);
                A.G("u17", a.toLayerSize);
                A.G("u25", a.fromLayerSize);
                m.g(1);
                U.l(!1, !1);
              },
            };
          },
        };
      })(),
      bc = (function () {
        return {
          instance: function (a, c) {
            var d = a.fromLayerSize,
              e = a.toLayerSize,
              m = a.toSparsity,
              n = a.stride ? a.stride : 1,
              q = (m * e) / d,
              r = e < d,
              l = d / e,
              v = Y.instance(a.weights),
              C =
                "s48" +
                [
                  d.toString(),
                  e.toString(),
                  m.toString(),
                  n.toString(),
                  c,
                ].join("_");
            A.Je(C) ||
              ((a = Vb.Me(c, "gl_FragColor", "gl_FragColor")),
              (e = [
                { type: "1f", name: "u17", value: e },
                { type: "1f", name: "u30", value: n },
              ]),
              r && e.push({ type: "1f", name: "u25", value: d }),
              (d = [(r ? q : m).toFixed(1), a]),
              r && d.push(l.toFixed(1)),
              A.sd(r ? "s40" : "s39", C, d),
              A.T(
                C,
                e.concat([
                  { type: "1i", name: "u15", value: 0 },
                  { type: "1i", name: "u22", value: 1 },
                  { type: "1i", name: "u14", value: 3 },
                ])
              ));
            return {
              Ca: !1,
              cb: function () {
                return q;
              },
              m: function () {
                v.remove();
              },
              V: function () {
                A.set(C);
                v.g(3);
                U.l(!1, !1);
              },
            };
          },
        };
      })(),
      Yb = (function () {
        return {
          instance: function (a) {
            var c = a.Id ? a.Id : 3,
              d = a.td ? a.td : 64,
              e = a.Md ? a.Md : 64,
              m = a.mb ? !0 : !1;
            a = { isFloat: !1, width: d, isPot: !1, isFlipY: !1 };
            var n = Y.instance(a),
              q = Y.instance(a),
              r = Y.instance(a),
              l = Y.instance(a),
              v = Y.instance({ isFloat: !0, width: e, isPot: !1, isFlipY: !1 }),
              C = 1 / d;
            return {
              process: function (E) {
                A.set("s36");
                l.u();
                U.l(m, !1);
                A.set("s37");
                for (var g = 0; g < c; ++g)
                  n.u(),
                    A.sa("u8", C, 0),
                    U.l(m, !1),
                    r.u(),
                    l.g(0),
                    U.l(m, !1),
                    q.u(),
                    n.g(0),
                    A.sa("u8", 0, C),
                    U.l(m, !1),
                    l.u(),
                    r.g(0),
                    U.l(m, !1),
                    g !== c - 1 && q.g(0);
                A.set("s38");
                v.u();
                E.g(0);
                q.g(1);
                l.g(2);
                U.l(m, !1);
                v.g(0);
              },
              Xb: function () {
                return v;
              },
            };
          },
        };
      })(),
      Zb = (function () {
        return {
          instance: function (a) {
            function c(v) {
              return Y.instance({
                isFloat: v,
                width: d.D,
                isPot: !1,
                isFlipY: !1,
              });
            }
            var d = Object.assign({ ee: 0.1, Sc: 9, D: 128, mb: !1 }, a),
              e = c(!1),
              m = [c(!1), c(!1), c(!1)],
              n = [c(!1), c(!1), c(!1)],
              q = c(!0),
              r = [e, n[0], n[1]];
            a =
              "uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u32;varying vec2 vv0;void main(){float b=0.,c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u32*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j).r,c+=f;}b/=c,gl_FragColor=vec4(b,0.,0.,1.);}"
                .replace("1.1111", Math.round((d.Sc - 1) / 2).toFixed(2))
                .replace("2.2222", (1 / d.D).toFixed(6));
            var l = { u1: 0 };
            A.Qc([
              {
                id: "s50",
                name: "_",
                h: "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(.2126,.7152,.0722),g=vec3(1.,1.,1.);void main(){vec3 b=texture2D(u1,vv0).rgb;float a=dot(b,f);gl_FragColor=vec4(a,a,a,a);}",
                j: l,
                i: ["u1"],
                precision: "lowp",
              },
              {
                id: "s51",
                name: "_",
                h: a,
                j: l,
                i: ["u1", "u32"],
                precision: "lowp",
              },
              {
                id: "s52",
                name: "_",
                h: "uniform sampler2D u33,u34,u35,u36;const float f=1.1111;const vec3 g=vec3(1.,1.,1.);varying vec2 vv0;void main(){vec3 a=texture2D(u33,vv0).rgb;float c=texture2D(u34,vv0).r,d=texture2D(u35,vv0).r,h=texture2D(u36,vv0).r,i=a.r*a.r;vec3 b=vec3(c,d,h),j=max(g*f,abs(i-b*b)),k=sqrt(j);gl_FragColor=vec4(a.r,(a-b)/k);}".replace(
                  "1.1111",
                  d.ee.toFixed(4)
                ),
                j: { u33: 0, u34: 1, u35: 2, u36: 3 },
                i: ["u33", "u34", "u35", "u36"],
                precision: "highp",
              },
            ]);
            return {
              process: function () {
                A.set("s50");
                e.da();
                U.l(d.mb, !1);
                A.set("s51");
                for (var v = 0; 3 > v; ++v)
                  A.sa("u32", 1, 0),
                    m[v].u(),
                    r[v].g(0),
                    U.l(!1, !1),
                    A.sa("u32", 0, 1),
                    n[v].u(),
                    m[v].g(0),
                    U.l(!1, !1);
                A.set("s52");
                q.u();
                e.g(0);
                n[0].g(1);
                n[1].g(2);
                n[2].g(3);
                U.l(!1, !1);
                q.g(0);
              },
              Xb: function () {
                return q;
              },
            };
          },
        };
      })(),
      W = {
        Ze: function () {
          return W.Yc() ? document.createElement("video") : !1;
        },
        Ma: function (a, c) {
          a[c] = !0;
          a.setAttribute(c, "true");
        },
        xe: function () {
          var a = !1,
            c = navigator.userAgent || navigator.vendor || window.opera;
          if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
              c
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              c.substr(0, 4)
            )
          )
            a = !0;
          return a;
        },
        Vc: function () {
          return (
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
          );
        },
        Ne: function () {
          var a = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
          return a && a.length && 2 < a.length
            ? [parseInt(a[1], 10), parseInt(a[2], 10), parseInt(a[3] || 0, 10)]
            : [0, 0, 0];
        },
        Dd: function () {
          try {
            return window.matchMedia("(orientation: portrait)").matches
              ? !0
              : !1;
          } catch (a) {
            return window.innerHeight > window.innerWidth;
          }
        },
        we: function () {
          return W.Wc() || W.Vc();
        },
        Wc: function () {
          var a = navigator.userAgent.toLowerCase();
          return -1 !== a.indexOf("safari") && -1 === a.indexOf("chrome")
            ? !0
            : !1;
        },
        Ag: function () {
          return W.xe()
            ? W.Dd()
              ? (window.innerHeight / window.innerWidth) * 45
              : 45
            : 45;
        },
        Yc: function () {
          return navigator.mediaDevices && navigator.mediaDevices.getUserMedia
            ? !0
            : !1;
        },
        pause: function (a) {
          a.pause();
        },
        rh: function (a) {
          a.play();
        },
        release: function (a) {
          a.pause();
          a.videoStream && a.videoStream.stop();
          a.videoStream = null;
        },
        Xc: function (a) {
          if (!a) return a;
          var c = null;
          if (a.video) {
            var d = function (e) {
              return e && "object" === typeof e ? Object.assign({}, e) : e;
            };
            c = {};
            "undefined" !== typeof a.video.width &&
              (c.width = d(a.video.width));
            "undefined" !== typeof a.video.height &&
              (c.height = d(a.video.height));
            "undefined" !== typeof a.video.facingMode &&
              (c.facingMode = d(a.video.facingMode));
          }
          c = { audio: a.audio, video: c };
          "undefined" !== typeof a.deviceId && W.Oc(c, a.deviceId);
          return c;
        },
        Oc: function (a, c) {
          c &&
            ((a.video = a.video || {}),
            (a.video.deviceId = { exact: c }),
            a.video.facingMode && delete a.video.facingMode);
        },
        $d: function (a) {
          var c = a.video.width;
          a.video.width = a.video.height;
          a.video.height = c;
          return a;
        },
        Ae: function (a) {
          function c(g) {
            return [
              480, 576, 640, 648, 720, 768, 800, 960, 1080, 1152, 1280, 1366,
              1920,
            ].sort(function (t, x) {
              return Math.abs(t - g) - Math.abs(x - g);
            });
          }
          function d(g) {
            var t = W.Xc(a);
            g = g(t);
            m.push(g);
            e(g);
          }
          function e(g) {
            if (g.video && g.video.facingMode && g.video.facingMode.exact) {
              var t = g.video.facingMode.exact;
              g = W.Xc(g);
              delete g.video.facingMode.exact;
              g.video.facingMode.ideal = t;
              m.push(g);
            }
          }
          var m = [];
          if (!a || !a.video) return m;
          e(a);
          if (a.video.width && a.video.height) {
            if (a.video.width.ideal && a.video.height.ideal) {
              var n = c(a.video.width.ideal).slice(0, 3),
                q = c(a.video.height.ideal).slice(0, 3),
                r = {},
                l = 0;
              for (r.na = void 0; l < n.length; r = { na: r.na }, ++l) {
                r.na = n[l];
                var v = {},
                  C = 0;
                for (v.ma = void 0; C < q.length; v = { ma: v.ma }, ++C)
                  if (
                    ((v.ma = q[C]),
                    r.na !== a.video.width.ideal ||
                      v.ma !== a.video.height.ideal)
                  ) {
                    var E = Math.max(r.na, v.ma) / Math.min(r.na, v.ma);
                    E < 4 / 3 - 0.1 ||
                      E > 16 / 9 + 0.1 ||
                      d(
                        (function (g, t) {
                          return function (x) {
                            x.video.width.ideal = g.na;
                            x.video.height.ideal = t.ma;
                            return x;
                          };
                        })(r, v)
                      );
                  }
              }
            }
            d(function (g) {
              return W.$d(g);
            });
          }
          a.video.width &&
            a.video.height &&
            (a.video.width.ideal &&
              a.video.height.ideal &&
              d(function (g) {
                delete g.video.width.ideal;
                delete g.video.height.ideal;
                return g;
              }),
            d(function (g) {
              delete g.video.width;
              delete g.video.height;
              return g;
            }));
          a.video.facingMode &&
            (d(function (g) {
              delete g.video.facingMode;
              return g;
            }),
            a.video.width &&
              a.video.height &&
              d(function (g) {
                W.$d(g);
                delete g.video.facingMode;
                return g;
              }));
          m.push({ audio: a.audio, video: !0 });
          return m;
        },
        Lf: function (a) {
          if (W.Dd()) {
            if (!a || !a.video) return !1;
            var c = a.video.width,
              d = a.video.height;
            if (!c || !d) return !1;
            if (c.ideal && d.ideal && c.ideal > d.ideal)
              return (a.video.height = c), (a.video.width = d), !0;
          }
          return !1;
        },
        rb: function (a) {
          a.volume = 0;
          W.Ma(a, "muted");
          if (W.Wc()) {
            if (1 === a.volume) {
              var c = function () {
                a.volume = 0;
                window.removeEventListener("mousemove", c, !1);
                window.removeEventListener("touchstart", c, !1);
              };
              window.addEventListener("mousemove", c, !1);
              window.addEventListener("touchstart", c, !1);
            }
            setTimeout(function () {
              a.volume = 0;
              W.Ma(a, "muted");
            }, 5);
          }
        },
        ce: function (a, c, d) {
          return null === a
            ? Promise.resolve()
            : new Promise(function (e, m) {
                if (a.srcObject && a.srcObject.getVideoTracks) {
                  var n = a.srcObject.getVideoTracks();
                  1 !== n.length
                    ? m("INVALID_TRACKNUMBER")
                    : ((n = n[0]), c ? W.get(a, e, m, d) : (n.stop(), e()));
                } else m("BAD_IMPLEMENTATION");
              });
        },
        qd: function (a, c, d, e) {
          function m(q) {
            n || ((n = !0), d(q));
          }
          var n = !1;
          return navigator.mediaDevices
            .getUserMedia(e)
            .then(function (q) {
              function r() {
                setTimeout(function () {
                  if (a.currentTime) {
                    var v = a.videoWidth,
                      C = a.videoHeight;
                    if (0 === v || 0 === C) m("VIDEO_NULLSIZE");
                    else {
                      v && (a.style.width = v.toString() + "px");
                      C && (a.style.height = C.toString() + "px");
                      v = { ve: null, If: null, lf: null };
                      try {
                        var E = q.getVideoTracks()[0];
                        E &&
                          ((v.lf = E),
                          (v.ve = E.getCapabilities()),
                          (v.If = E.getSettings()));
                      } catch (g) {}
                      W.we()
                        ? a.parentNode && null !== a.parentNode
                          ? (n || c(a, q, v),
                            setTimeout(function () {
                              a.play();
                            }, 100))
                          : (document.body.appendChild(a),
                            W.rb(a),
                            n || c(a, q, v),
                            setTimeout(function () {
                              a.style.transform = "scale(0.0001,0.0001)";
                              a.style.position = "fixed";
                              a.style.bottom = "0px";
                              a.style.right = "0px";
                              W.rb(a);
                              setTimeout(function () {
                                a.play();
                              }, 100);
                            }, 80))
                        : n || c(a, q, v);
                    }
                  } else m("VIDEO_NOTSTARTED");
                }, 700);
              }
              function l() {
                a.removeEventListener("loadeddata", l, !1);
                var v = a.play();
                W.rb(a);
                "undefined" === typeof v
                  ? r()
                  : v
                      .then(function () {
                        r();
                      })
                      .catch(function () {
                        m("VIDEO_PLAYPROMISEREJECTED");
                      });
              }
              "undefined" !== typeof a.srcObject
                ? (a.srcObject = q)
                : ((a.src = window.URL.createObjectURL(q)),
                  (a.videoStream = q));
              W.rb(a);
              a.addEventListener("loadeddata", l, !1);
            })
            .catch(function (q) {
              m(q);
            });
        },
        get: function (a, c, d, e) {
          if (!a) return d && d("VIDEO_NOTPROVIDED"), !1;
          if (!W.Yc()) return d && d("MEDIASTREAMAPI_NOTFOUND"), !1;
          if (e && e.video) {
            if (W.Vc()) {
              var m = W.Ne();
              0 !== m[0] && (12 > m[0] || (12 === m[0] && 2 > m[1])) && W.Lf(e);
            }
            e.video.width &&
              e.video.width.ideal &&
              (a.style.width = e.video.width.ideal + "px");
            e.video.height &&
              e.video.height.ideal &&
              (a.style.height = e.video.height.ideal + "px");
          }
          W.Ma(a, "autoplay");
          W.Ma(a, "playsinline");
          e && e.audio ? (a.volume = 0) : W.Ma(a, "muted");
          W.qd(
            a,
            c,
            function () {
              function n(r) {
                if (0 === r.length) d("INVALID_FALLBACKCONSTRAINTS");
                else {
                  var l = r.shift();
                  W.qd(
                    a,
                    c,
                    function () {
                      n(r);
                    },
                    l
                  );
                }
              }
              var q = W.Ae(e);
              n(q);
            },
            e
          );
        },
        Ye: function (a) {
          if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.enumerateDevices
          )
            return a(!1, "NOTSUPPORTED"), !1;
          navigator.mediaDevices
            .enumerateDevices()
            .then(function (c) {
              (c = c.filter(function (d) {
                return (
                  d.kind &&
                  -1 !== d.kind.toLowerCase().indexOf("video") &&
                  d.label &&
                  d.deviceId
                );
              })) &&
              c.length &&
              0 < c.length
                ? a(c, !1)
                : a(!1, "NODEVICESFOUND");
            })
            .catch(function () {
              a(!1, "PROMISEREJECTED");
            });
        },
        cg: function (a, c, d) {
          var e = {};
          e[c] = d;
          c = [];
          c.push(e);
          a.applyConstraints({ advanced: c }).catch(function () {});
        },
      },
      pa = (function () {
        function a(t, x, k, p, H, I) {
          if (I === H.length) p();
          else {
            switch (H[I]) {
              case "D":
                t();
                break;
              case "S":
                x()
                  .then(function () {
                    g.ae();
                    a(t, x, k, p, H, ++I);
                  })
                  .catch(p);
                return;
              case "R":
                k();
            }
            a(t, x, k, p, H, ++I);
          }
        }
        var c = {
            n: 5,
            kc: 1,
            Gd: 0,
            bb: [35, 49],
            Ya: [2, 200],
            k: 0.7,
            Qf: 200,
            tf: 0.05,
          },
          d = -1,
          e = null,
          m = -1,
          n = -1,
          q = 0,
          r = -1,
          l = -1,
          v = 0,
          C = 0,
          E = c.Ya[1],
          g = {
            od: function () {
              switch (d) {
                case -1:
                  return -1;
                case 0:
                  return l + e.Gd;
                case 1:
                  return v;
              }
            },
            Fg: function (t) {
              return Math.pow(
                Math.min(Math.max(r, 0), e.n - 1) / (e.n - 1),
                t || 1
              );
            },
            A: function (t) {
              e = Object.assign({}, c, t);
              r = l = e.kc;
              d = 0;
              g.reset();
            },
            ae: function (t) {
              t = ("undefined" === typeof t ? Date.now() : t) || 0;
              var x = Math.min(Math.max(t - C, e.Ya[0]), e.Ya[1]);
              E = x;
              C = t;
              var k = -1 === m ? 0 : e.k;
              m = Math.min(Math.max(1e3 / x, 5), 120) * (1 - k) + m * k;
              t - n > e.Qf &&
                5 < ++q &&
                ((x = e.k),
                (r =
                  r * (1 - x) +
                  (m < e.bb[0] ? l - 1 : m > e.bb[1] ? l + 1 : l) * x),
                Math.abs(r - l) > 1 - e.tf &&
                  ((x = Math.min(Math.max(Math.round(r), 0), e.n - 1)),
                  x !== l && ((r = l = x), (m = (e.bb[1] - e.bb[0]) / 2))),
                (n = t));
            },
            rc: function (t, x, k, p, H) {
              a(t, x, k, p, H, 0);
            },
            vc: function (t) {
              v = t;
              d = 1;
            },
            Gc: function () {
              d = 0;
              g.reset();
            },
            reset: function () {
              E = c.Ya[1];
              n = m = -1;
              q = 0;
            },
            Qe: function () {
              return E;
            },
          };
        return g;
      })(),
      Ma = (function () {
        function a() {
          d(k + t.jc);
          p.port.postMessage("DONE");
        }
        function c() {
          var f = t.ga;
          z.isEnabled && (f = Math.max(f, z.ga));
          N.Sa =
            0 === f
              ? window.requestAnimationFrame(d)
              : window.requestAnimationFrame(e);
        }
        function d(f) {
          I.ya &&
            null !== x &&
            ((f -= k),
            (f = Math.min(Math.max(f, t.$c[0]), t.$c[1])),
            (k += f),
            n(),
            z.isEnabled && z.Y && I.Z && k - z.fc > t.Lc && (v(), (z.fc = k)),
            x(k));
        }
        function e(f) {
          I.ya && (N.timeout = window.setTimeout(d.bind(null, f), t.ga));
        }
        function m() {
          x = null;
          I.ya = !1;
          n();
        }
        function n() {
          N.Sa && (window.cancelAnimationFrame(N.Sa), (N.Sa = null));
          N.timeout && (window.clearTimeout(N.timeout), (N.timeout = null));
        }
        function q(f) {
          f && !I.Z
            ? ((I.Z = !0),
              H && pa.Gc(),
              p.port.postMessage("STOP"),
              aa.be(!0),
              c())
            : !f &&
              I.Z &&
              ((I.Z = !1),
              H && pa.vc(1),
              aa.be(!1),
              p.port.postMessage("START"));
        }
        function r(f) {
          f.target.hidden ? M() : J();
        }
        function l(f, y, G) {
          y = f.createShader(y);
          f.shaderSource(y, G);
          f.compileShader(y);
          return y;
        }
        function v() {
          z.Y = !1;
          var f = z.fb,
            y = z.gb,
            G = z.hb,
            L = z.X;
          f.uniform1f(z.rd, Math.random());
          z.za ? y.beginQueryEXT(L, G) : f.beginQuery(L, G);
          f.drawElements(f.POINTS, 1, f.UNSIGNED_SHORT, 0);
          z.za ? y.endQueryEXT(L) : f.endQuery(L);
          f.flush();
          E()
            .then(function (h) {
              h = (t.ge * t.Jc * 1e3) / h;
              z.Db = (z.Db + 1) % t.Ea;
              z.hc[z.Db] = h;
              if (++z.Ed > t.Ea) {
                z.ob.set(z.hc);
                z.ob.sort();
                h = z.ob[Math.floor(t.Ea / 2)];
                z.$a = Math.max(z.$a, h);
                var F;
                for (
                  F = 0;
                  F < z.Ec &&
                  !(h > z.$a * (1 - (t.Kc[F] + t.he * (F >= z.Bb ? 1 : -1))));
                  ++F
                )
                  F === z.Ec - 1 && ++F;
                F !== z.Bb &&
                  (console.log("THERMAL THROTTLING LEVEL = " + F.toString()),
                  (z.Bb = F),
                  (z.ga = 0 === F ? 0 : t.fe[F - 1]),
                  t.Ic && t.Ic(F));
              }
              z.Y = !0;
            })
            .catch(function () {
              z.Y = !0;
            });
        }
        function C(f) {
          var y = z.fb,
            G = z.gb,
            L = z.hb;
          L = z.za
            ? G.Cg(L, G.QUERY_RESULT_AVAILABLE_EXT)
            : y.getQueryParameter(L, y.QUERY_RESULT_AVAILABLE);
          y = y.getParameter(G.GPU_DISJOINT_EXT);
          L ? f(!y) : setTimeout(C.bind(null, f), 0.1);
        }
        function E() {
          return new Promise(function (f, y) {
            C(function (G) {
              if (G) {
                G = z.fb;
                var L = z.gb,
                  h = z.hb;
                G = z.za
                  ? L.getQueryObjectEXT(h, L.QUERY_RESULT_EXT)
                  : G.getQueryParameter(h, G.QUERY_RESULT);
                f(G);
              } else y();
            });
          });
        }
        var g = {
            zd: !0,
            $c: [1, 200],
            jc: 20,
            ga: 0,
            ie: !1,
            Jc: 50,
            ge: 240,
            Lc: 3e3,
            Ea: 3,
            Kc: [0.2, 0.35, 0.5],
            he: 0.05,
            fe: [8, 20, 40],
            Ic: null,
          },
          t = null,
          x = null,
          k = 0,
          p = null,
          H = !1,
          I = { qa: !1, Z: !0, ec: !1, dc: !1, cc: !1, ya: !1 },
          N = { Sa: null, timeout: null },
          z = {
            isEnabled: !1,
            Y: !1,
            fb: null,
            gb: null,
            hb: null,
            X: null,
            rd: null,
            za: !0,
            Bb: 0,
            Ec: 0,
            ga: 0,
            fc: 0,
            Ed: 0,
            hc: null,
            ob: null,
            Db: 0,
            $a: 0,
          },
          J = q.bind(null, !0),
          M = q.bind(null, !1),
          u = {
            A: function (f) {
              t = Object.assign(g, f);
              Object.assign(I, { Z: !0, qa: !0, ya: !1 });
              if (t.ie) {
                f = document.createElement("canvas");
                f.setAttribute("width", "1");
                f.setAttribute("height", "1");
                var y = { antialias: !1 };
                f = f.getContext("webgl2", y) || f.getContext("webgl", y);
                if (
                  (y =
                    f.getExtension("EXT_disjoint_timer_query") ||
                    f.getExtension("EXT_disjoint_timer_query_webgl2"))
                ) {
                  z.fb = f;
                  z.gb = y;
                  z.isEnabled = !0;
                  z.za = y.beginQueryEXT ? !0 : !1;
                  var G = l(
                      f,
                      f.VERTEX_SHADER,
                      "attribute vec4 a0;void main(){gl_Position=a0;}"
                    ),
                    L = l(
                      f,
                      f.FRAGMENT_SHADER,
                      "precision lowp float;uniform float u37;void main(){vec4 a=u37*vec4(1.,2.,3.,4.);for(int b=0;b<666;b+=1)a=cos(a);gl_FragColor=a;}".replace(
                        "666",
                        t.Jc.toString()
                      )
                    ),
                    h = f.createProgram();
                  f.attachShader(h, G);
                  f.attachShader(h, L);
                  f.linkProgram(h);
                  G = f.getAttribLocation(h, "a0");
                  z.rd = f.getUniformLocation(h, "u37");
                  f.useProgram(h);
                  f.enableVertexAttribArray(G);
                  h = f.createBuffer();
                  f.bindBuffer(f.ARRAY_BUFFER, h);
                  f.bufferData(
                    f.ARRAY_BUFFER,
                    new Float32Array([0.5, 0.5, 0, 1]),
                    f.STATIC_DRAW
                  );
                  f.vertexAttribPointer(G, 4, f.FLOAT, !1, 16, 0);
                  h = f.createBuffer();
                  f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, h);
                  f.bufferData(
                    f.ELEMENT_ARRAY_BUFFER,
                    new Uint16Array([0]),
                    f.STATIC_DRAW
                  );
                  f.disable(f.DEPTH_TEST);
                  f.disable(f.DITHER);
                  f.disable(f.STENCIL_TEST);
                  f.viewport(0, 0, 1, 1);
                  h = z.za ? y.createQueryEXT() : f.createQuery();
                  z.hb = h;
                  z.X = y.TIME_ELAPSED_EXT || f.TIME_ELAPSED;
                  z.Bb = 0;
                  z.Ec = t.Kc.length;
                  z.ga = 0;
                  z.fc = -t.Lc;
                  z.hc = new Float32Array(t.Ea);
                  z.ob = new Float32Array(t.Ea);
                  z.$a = 0;
                  z.Db = 0;
                  z.Ed = 0;
                  z.Y = !0;
                }
              }
              if (t.zd) {
                f = !1;
                try {
                  if ("undefined" === typeof SharedWorker) {
                    var F = URL.createObjectURL(
                        new Blob(
                          [
                            "let handler = null;\n      self.addEventListener('message', function(e){\n        if (handler !== null){\n          clearTimeout(handler);\n          handler = null;\n        }\n        switch (e.data) {\n          case 'START':\n          case 'DONE':\n            handler = setTimeout(function(){\n              self.postMessage('TICK');\n            }, " +
                              t.jc.toString() +
                              ");\n            break;\n          case 'STOP':\n            break;\n        };\n      }, false);",
                          ],
                          { type: "text/javascript" }
                        )
                      ),
                      K = new Worker(F);
                    K.addEventListener("message", a);
                    p = { Pd: K, port: K };
                    I.ec = !0;
                  } else {
                    var P = URL.createObjectURL(
                        new Blob(
                          [
                            "let handler = null;\n      onconnect = function(e) {\n        const port = e.ports[0];\n        port.addEventListener('message', function(e) {\n          \n          if (handler !== null){\n            clearTimeout(handler);\n            handler = null;\n          }\n          switch (e.data) {\n            case 'START':\n            case 'DONE':\n              handler = setTimeout(function(){\n                port.postMessage('TICK');\n              }, " +
                              t.jc.toString() +
                              ");\n              break;\n            case 'STOP':\n              break;\n          };\n          \n        });\n        \n        port.start();\n      } // end onconnect()",
                          ],
                          { type: "text/javascript" }
                        )
                      ),
                      da = new SharedWorker(P);
                    da.port.start();
                    da.port.addEventListener("message", a);
                    p = { Pd: da, port: da.port };
                    I.dc = !0;
                  }
                  f = !0;
                } catch (ra) {}
                f &&
                  ("onvisibilitychange" in document
                    ? document.addEventListener("visibilitychange", r)
                    : (window.addEventListener("blur", M),
                      window.addEventListener("focus", J)),
                  (I.cc = !0));
              }
              H = "undefined" !== typeof pa;
            },
            m: function () {
              m();
              I.cc &&
                ("onvisibilitychange" in document
                  ? document.removeEventListener("visibilitychange", r)
                  : (window.removeEventListener("blur", M),
                    window.removeEventListener("focus", J)),
                (I.cc = !1));
              I.dc
                ? (p.port.close(), (I.dc = !1))
                : I.ec && (p.Pd.terminate(), (I.ec = !1));
              Object.assign(I, { Z: !0, qa: !1, ya: !1 });
              x = null;
            },
            hh: function () {
              return I.Z;
            },
            update: function (f) {
              Object.assign(t, f);
            },
            rc: function (f) {
              I.qa || u.A({});
              n();
              I.ya = !0;
              x = f;
              I.Z && c();
            },
            stop: m,
          };
        return u;
      })(),
      tb = (function () {
        var a = {
            Kd: 4,
            ub: [1.5, 1.5, 2],
            O: [0.1, 0.1, 0.1],
            Td: 1,
            D: -1,
            M: -1,
            Kf: 2,
            sf: 1,
            Ud: !0,
            Ie: 0.8,
          },
          c = null,
          d = [],
          e = 0,
          m = [0.5, 0.5, 1];
        return {
          A: function (n) {
            c = Object.assign({}, a, n);
            d.splice(0);
            n = c.ub[0] * c.O[0];
            var q = c.ub[1] * c.O[1],
              r = 1 / (1 + c.ub[2] * c.O[2]),
              l = c.Td * Math.min(c.D, c.M),
              v = l / c.D;
            l /= c.M;
            var C = 0.5 * c.Ie;
            C *= C;
            for (var E = 0; E < c.Kd; ++E) {
              var g = Math.pow(r, E),
                t = v * g,
                x = l * g;
              g = t * n;
              var k = x * q,
                p = t / 2;
              x /= 2;
              for (
                var H = 1 + (1 - p - p) / g, I = 1 + (1 - x - x) / k, N = 0;
                N < I;
                ++N
              )
                for (var z = x + N * k, J = z - 0.5, M = 0; M < H; ++M) {
                  var u = p + M * g,
                    f = u - 0.5;
                  f * f + J * J > C || d.push([u, z, t * c.sf]);
                }
            }
            c.Ud &&
              d.sort(function (y, G) {
                var L = y[0] - 0.5;
                y = y[1] - 0.5;
                var h = G[0] - 0.5;
                G = G[1] - 0.5;
                return L * L + y * y - (h * h + G * G);
              });
          },
          get: function () {
            var n = d.length;
            if (0 === n) return m;
            e >= n && (e = 0);
            var q = d[Math.floor(e)];
            e = (e + 1 / c.Kf) % n;
            return q;
          },
        };
      })(),
      ba = {
        neuralNetworkPath: "NN_DEFAULT.json",
        fa: 0,
        Eb: [2, 8],
        Af: {
          threshold: 1,
          nScaleLevels: 2,
          scale0Factor: 0.8,
          overlapFactors: [2, 2, 3],
          scanCenterFirst: !0,
          nDetectsPerLoop: -1,
          multiDetectionThresholdFactors: [0.5, 0.6],
          isCleanGLStateAtEachIteration: !0,
          animateProcessOrder: "DSR",
        },
        Nf: 50,
        Hd: 0.3,
        mf: 8,
        pf: 0.3,
        Jf: {
          translationFactorRange: [0.0015, 0.005],
          rotationFactorRange: [0.003, 0.02],
          qualityFactorRange: [0.9, 0.98],
          alphaRange: [0.05, 1],
          followZRotAlphaFactor: 0.8,
        },
        Pa: [0.65, 1, 0.262],
        O: [0.092, 0.092, 0.3],
        ke: 0.2,
        me: 2,
        le: 0.1,
        qf: 8,
        Jd: 1,
        Ke: Za.qb.bind(null, 0.3, 0.7),
        Tf: 20,
        Yd: 3,
      },
      oa = {
        facingMode: "user",
        idealWidth: 800,
        idealHeight: 600,
        minWidth: 480,
        maxWidth: 1920,
        minHeight: 480,
        maxHeight: 1920,
        rotate: 0,
        flipX: !1,
      },
      ia = { lc: -3, jf: -1, error: -2, ready: 1, play: 2, pause: 3 },
      na = ia.lc,
      B = null,
      ec = {
        kb: !1,
        zc: null,
        element: null,
        N: null,
        H: [0, 0],
        L: [0.5, 0.5],
        v: [0.5, 0, 0, 0.5],
        wb: 0,
        La: null,
        jb: !1,
      },
      Q = null,
      fc = {
        Ka: null,
        Va: null,
        antialias: !0,
        Mc: "./",
        Fa: null,
        ia: null,
        fa: ba.fa,
        Od: ba.fa,
        lb: !1,
        ua: !0,
      },
      Oa = null,
      ea = null,
      sa = null,
      Pa = 1,
      Na = { uc: -1, Mb: -1 },
      Z = null,
      gc = { D: 0, M: 0, H: [0, 0], xa: null },
      X = { Da: null, buffer: null, O: null, Pa: null, aa: ba.Jd, Na: null },
      Sa = null,
      qa = null,
      O = { o: 1, pa: 0, W: null, Ad: !1, Fd: 0, mc: 0 },
      hb = [],
      ib = [],
      Eb = {
        VERSION: "2.1.7",
        init: function (a) {
          function c() {
            na !== ia.error &&
              2 === ++e &&
              (Ja(),
              xb(),
              Ia(),
              Q.Ka &&
                ((na = ia.ready),
                Q.Ka(!1, {
                  GL: b,
                  canvasElement: Q.ia,
                  videoTexture: B.N.get(),
                  videoTransformMat2: B.v,
                  maxFacesDetected: O.o,
                  videoElement: B.element,
                }),
                fb()),
              eb());
          }
          if (na !== ia.lc)
            return (
              a.callbackReady && a.callbackReady("ALREADY_INITIALIZED"), !1
            );
          na = ia.jf;
          B = Object.assign({}, ec);
          Q = Object.assign({}, fc);
          Z = Object.assign({}, gc);
          O.W = [0];
          X.O = ba.O.slice(0);
          X.Pa = ba.Pa.slice(0);
          "undefined" !== typeof a.antialias && (Q.antialias = a.antialias);
          a.callbackReady && (Q.Ka = a.callbackReady);
          a.callbackTrack && (Q.Va = a.callbackTrack);
          a.nExpressions && (X.aa = a.nExpressions);
          a.expressionsEasings && (X.Na = a.expressionsEasings);
          "undefined" !== typeof a.animateDelay && (Q.fa = a.animateDelay);
          "undefined" !== typeof a.NNCPath && (Q.Mc = a.NNCPath);
          "undefined" !== typeof a.NNC && (Q.Fa = a.NNC);
          "undefined" !== typeof a.maxFacesDetected &&
            (O.o = Math.max(1, a.maxFacesDetected));
          "undefined" !== typeof a.followZRot &&
            (Q.ua = a.followZRot ? !0 : !1);
          if (O.o > ba.mf) return Ha("MAXFACES_TOOHIGH"), !1;
          if (!a.canvasId && !a.canvas) return Ha("NO_CANVASID"), !1;
          Q.ia = a.canvas ? a.canvas : document.getElementById(a.canvasId);
          if (!Q.ia) return Ha("INVALID_CANVASID"), !1;
          Z.D = Q.ia.width;
          Z.M = Q.ia.height;
          if (!Z.D || !Z.M) return Ha("INVALID_CANVASDIMENSIONS"), !1;
          for (var d = 0; d < O.o; ++d)
            hb.push(new Float32Array(ba.qf)), ib.push(0);
          Ma.A({ zd: a.isKeepRunningOnWinFocusLost || !1, ga: Q.fa });
          pa.A({ kc: 0, n: ba.Eb[1] - ba.Eb[0] + 1, Gd: ba.Eb[0] });
          ea = Object.create(ba.Af);
          a.scanSettings &&
            (Object.assign(ea, a.scanSettings),
            -1 !== ea.nDetectsPerLoop ? pa.vc(ea.nDetectsPerLoop) : pa.Gc());
          sa = Object.create(ba.Jf);
          a.stabilizationSettings && Object.assign(sa, a.stabilizationSettings);
          var e = 0;
          a.videoSettings && a.videoSettings.videoElement
            ? $a(a.videoSettings.videoElement, c)
            : (a.videoSettings && Object.assign(oa, a.videoSettings),
              zb(a.onWebcamAsk, a.onWebcamGet, function (m) {
                $a(m, c);
              }));
          Qb(function (m) {
            if (!Rb()) return !1;
            Oa = new Fb({ pb: m.layers, qc: "gpuRawAvg", nc: Tb });
            A.Qc([
              {
                id: "s54",
                name: "_",
                ta: "attribute vec2 a0;uniform mat2 u38;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=vec2(.5,.5)+u38*a0;}",
                Ta: ["a0"],
                Ha: [2],
                h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                i: ["u1", "u38"],
                precision: "lowp",
              },
              {
                id: "s55",
                name: "_",
                h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                ta: "attribute vec2 a0;uniform sampler2D u39;uniform mat2 u38;uniform vec2 u40;uniform float u41,u42,u43;varying vec2 vv0;void main(){vec4 a=texture2D(u39,vec2(.17,u41));vec2 f=a.gb,g=a.a*u40,b=a0;b.x*=u43;float c=cos(u42),d=sin(u42);vec2 h=mat2(c,d,-d,c)*b,i=f+h*.5*g,j=i-.5;vv0=.5+2.*u38*j,gl_Position=vec4(a0,0.,1.);}",
                Ta: ["a0"],
                Ha: [2],
                i: "u1 u39 u40 u41 u42 u43 u38".split(" "),
                precision: "lowp",
              },
              {
                id: "s56",
                name: "_",
                h: "uniform sampler2D u44,u39;uniform vec3 u45,u46;uniform float u47,u48,u41,u49,u42,u50;const vec4 e=vec4(.25,.25,.25,.25);void main(){vec4 d=texture2D(u44,vec2(.625,.625)),f=texture2D(u44,vec2(.875,.625)),a=texture2D(u39,vec2(.17,u41));float g=dot(d-f,e);bool h=g>u48;h?a.r=2.:a.r>u47?a.r=0.:a.r>1.9?a.r+=1.:0.,a.r*=u49;if(a.r<.9)a=vec4(1.,u45);else{a.r*=step(1.9,a.r);float i=dot(e,texture2D(u44,vec2(.875,.875))),j=dot(e,texture2D(u44,vec2(.125,.625))),k=dot(e,texture2D(u44,vec2(.375,.625))),b=cos(u42),c=sin(u42);vec2 l=mat2(b,c*u50,-c/u50,b)*vec2(i,j);a.gba+=vec3(l,k)*u46*a.a;}gl_FragColor=a;}",
                ta: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                i: "u44 u39 u45 u47 u46 u49 u42 u50 u48 u41".split(" "),
              },
              {
                id: "s57",
                name: "_",
                ta: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                h: "uniform sampler2D u44;uniform float u49;const vec4 e=vec4(.25,.25,.25,.25);const vec3 f=vec3(.5,.5,.5);void main(){float a=dot(e,texture2D(u44,vec2(.125,.875))),b=dot(e,texture2D(u44,vec2(.375,.875))),c=dot(e,texture2D(u44,vec2(.625,.875))),d=dot(e,texture2D(u44,vec2(.625,.625)));vec3 g=vec3(a,b,c)*.5+f;gl_FragColor=vec4(g,d*u49);}",
                i: ["u44", "u49"],
              },
              {
                id: "s58",
                name: "_",
                ta: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                h: "uniform sampler2D u44;const vec4 e=vec4(.25,.25,.25,.25);void main(){float a=dot(e,texture2D(u44,vec2(.375,.375))),b=dot(e,texture2D(u44,vec2(.625,.375))),c=dot(e,texture2D(u44,vec2(.875,.375))),d=dot(e,texture2D(u44,vec2(.125,.125)));gl_FragColor=vec4(a,b,c,d);}",
                i: ["u44"],
              },
              {
                id: "s53",
                name: "_",
                h: "uniform sampler2D u39;uniform vec2 u51;uniform float u52;varying vec2 vv0;void main(){float f=step(.5,mod(gl_FragCoord.y+1.5,2.)),c=step(.33,vv0.x);vec4 a=texture2D(u39,vv0+u51);a.a=mix(a.a*u52,a.a,c);vec4 d=floor(255.*a),g=255.*(255.*a-d),b=mix(d,g,f)/255.;b.x=mix(step(a.x,1.5),b.x,c),gl_FragColor=b;}",
                i: ["u39", "u52", "u51"],
              },
            ]);
            sb();
            Pb();
            kb();
            jb();
            c();
          });
          return !0;
        },
        destroy: function () {
          Ma.m();
          return new Promise(function (a) {
            Eb.toggle_pause(!0, !0)
              .finally(function () {
                Oa && Oa.m();
                Qa.m();
                Oa = qa = Sa = null;
                hb.splice(0);
                ib.splice(0);
                Z.xa = null;
                X.Da = null;
                B.N = null;
                na = ia.lc;
                a();
              })
              .catch(function () {});
          });
        },
        toggle_pause: function (a, c) {
          if (!Ya()) return Promise.reject("NOT_READY");
          var d = null;
          d = B.jb
            ? Promise.resolve()
            : c
            ? W.ce(B.element, !a, B.La)
            : Promise.resolve();
          a
            ? rb()
            : d.then(function () {
                eb();
              });
          return d;
        },
        update_videoSettings: function (a) {
          rb();
          return new Promise(function (c, d) {
            W.ce(B.element, !1, B.La)
              .then(function () {
                Object.assign(oa, a);
                zb(null, null, function (e) {
                  $a(e, function () {
                    Ja();
                    Ia();
                    eb();
                    c();
                  });
                });
              })
              .catch(d);
          });
        },
        toggle_slow: function (a) {
          Ya() &&
            na === ia.play &&
            (a && !Q.lb
              ? ((Q.Od = Q.fa),
                (ea.nDetectsPerLoop = 1),
                this.set_animateDelay(ba.Vf),
                (Q.lb = !0))
              : !a &&
                Q.lb &&
                ((ea.nDetectsPerLoop = -1),
                this.set_animateDelay(Q.Od),
                (Q.lb = !1)));
        },
        set_animateDelay: function (a) {
          Q.fa = a;
          Ma.update({ ga: Q.fa });
        },
        resize: function () {
          if (!Ya()) return !1;
          var a = Q.ia.width,
            c = Q.ia.height;
          if (!lb() && a === Z.D && c === Z.M) return !1;
          Z.D = a;
          Z.M = c;
          A.R();
          kb();
          jb();
          Ja();
          Ia();
          return !0;
        },
        set_inputTexture: function (a, c, d) {
          B.H[0] = c;
          B.H[1] = d;
          B.N = Y.instance({ width: c, height: d, Zb: a });
          B.kb = !0;
          Ja();
          fb();
          Ia();
        },
        reset_GLState: function () {
          fb();
          Z.xa.remove();
          X.Da.remove();
          sb();
        },
        render_video: function () {
          va.P();
          A.set("s54");
          b.viewport(0, 0, Z.D, Z.M);
          B.N.g(0);
          U.l(!0, !0);
        },
        reset_inputTexture: function () {
          B.kb = !1;
          B.N = B.zc;
          lb();
          Ja();
          Ia();
        },
        get_videoDevices: function (a) {
          return W.Ye(a);
        },
        set_scanSettings: function (a) {
          Object.assign(ea, a);
          -1 !== ea.nDetectsPerLoop ? pa.vc(ea.nDetectsPerLoop) : pa.Gc();
          kb();
          jb();
        },
        set_stabilizationSettings: function (a) {
          Object.assign(sa, a);
        },
        set_videoOrientation: function (a, c) {
          Ya() && ((oa.flipX = c), (oa.rotate = a), Ja(), Ia());
        },
        update_videoElement: function (a, c) {
          $a(a ? a : B.element, function () {
            xb();
            Ja();
            Ia();
            c && c();
          });
        },
        create_new: function () {
          return window.JEELIZFACEFILTERGEN();
        },
      };
    return Eb;
  };
  window.JEELIZFACEFILTER = window.JEELIZFACEFILTERGEN();
  return JEELIZFACEFILTER || window.JEELIZFACEFILTER;
})();
