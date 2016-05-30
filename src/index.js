/* global $ */

const Nightmare = require('nightmare');
const rp = require('request-promise');
const zones = require('../zones.json');

const userAgent = 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36';
const loginUri = 'https://zeus.sii.cl/AUT2000/InicioAutenticacion/IngresoRutClave.html?https://misii.sii.cl/cgi_misii/siihome.cgi';
const boletasUri = 'http://www.sii.cl/boleta_honorarios/';

const getDestinataryName = rut => {
  const options = {
    uri: 'https://siichile.herokuapp.com/consulta',
    qs: {rut: rut},
    json: true
  };
  return rp(options).then(data => data.razon_social);
};

const sendCredentials = user => {
  $('#rutcntr').val(user.rut);
  $('#rutcntr').blur();
  $('#clave').val(user.password);
  $('a[href="javascript:ejecuta_opcion()"]')[0].click();
};

const gotToLast = () => {
  $('a[href="javascript:muestra_oculta_opc(1)"]')[0].click();
  $('#menu1 ul li:nth-child(2) a')[0].click();
};

const gotToDestinatary = () => {
  $('a[href="javascript:muestra_oculta_opc(1)"]')[0].click();
  $('#menu1 ul li:nth-child(1) a')[0].click();
};

const selectLast = () => {
  $('a[href="javascript:envia();"]')[0].click();
};

const selectRetention = () => {
  $('input[name=OptTipoRetencion]').val('RETRECEPTOR');
  $('#cmdContinuar').click();
};

const fillForm = (work, destinatary, zone, commune) => {
  destinatary = destinatary || null;
  zone = zone || null;
  commune = commune || null;
  $('#valor_prestacion_1').val(work.value);
  if (work.description) $('#desc_prestacion_1').val(work.description);
  if (destinatary !== null) {
    $('input[name=txt_rut_destinatario]').val(destinatary.rut);
    $('input[name=txt_dv_destinatario]').val(destinatary.dv);
    $('input[name=txt_nombres_destinatario]').val(destinatary.name);
    $('input[name=txt_domicilio_destinatario]').val(destinatary.address);
  }
  if (zone !== null) {
    $('select[name=cod_region]').val(zone);
    $('select[name=cod_region]').change();
  }
  if (commune !== null) {
    $('select[name=cbo_comuna]').val(commune);
    $('select[name=cbo_comuna]').change();
  }
};

const createPreview = () => {
  $('input[name=cmdAceptar]').click();
};

const confirm = () => {
  $('input[name=cmdconfirmar]').click();
};

const sendEmail = () => {
  $('#cmdenviar').click();
};

const confirmSendEmail = () => {
  $('#cmdcontinuar').click();
};

const exit = () => {
  $('#cmdsalir').click();
};

const byLastInvoice = (user, work) => {
  return new Promise((resolve, reject) => {
    new Nightmare()
      .viewport(1000, 1000)
      .useragent(userAgent)
      .goto(loginUri)
      .wait()
      .evaluate(sendCredentials, user)
      .wait(1000)
      .goto(boletasUri)
      .evaluate(gotToLast)
      .evaluate(selectLast)
      .evaluate(fillForm, work)
      .evaluate(createPreview)
      .evaluate(confirm)
      .evaluate(sendEmail)
      .evaluate(confirmSendEmail)
      .evaluate(exit)
      .run(err => {
        if (err) return reject(err);
        resolve();
      });
  });
};

const byDestinatary = (user, work, destinatary, zone, commune) => {
  return new Promise((resolve, reject) => {
    new Nightmare()
      .viewport(1000, 1000)
      .useragent(userAgent)
      .goto(loginUri)
      .wait()
      .evaluate(sendCredentials, user)
      .wait(1000)
      .goto(boletasUri)
      .evaluate(gotToDestinatary)
      .evaluate(selectRetention)
      .evaluate(fillForm, work, destinatary, zone, commune)
      .evaluate(createPreview)
      .evaluate(confirm)
      .evaluate(sendEmail)
      .evaluate(confirmSendEmail)
      .evaluate(exit)
      .run(err => {
        if (err) return reject(err);
        resolve();
      });
  });
};

module.exports = {
  byLastInvoice: byLastInvoice,
  byDestinatary: byDestinatary,
  getDestinataryName: getDestinataryName,
  zones: zones
};
