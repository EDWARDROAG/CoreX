const base = import.meta.env.BASE_URL;

export const asset = (path) => `${base}images/${path}`;

export const IMAGES = {
  banner: asset('banher.png'),
  // Nota: los archivos del cliente vienen con nombres invertidos respecto al color real del logo
  logoWhite: asset('logo_black.png'),
  logoBlack: asset('logo_white.png'),
  favicon: asset('logo_favicon.png'),
  entryPc: asset('entry_pc.png'),
  performancePc: asset('performance_pc.png'),
  elitePc: asset('elite_pc.png'),
  workstationPc: asset('workstation_pc.png'),
  fondoMantenimiento: asset('img_fondo_mantenimiento.png'),
  fondoArmadoPcs: asset('img_fondo_armado_pcs.png'),
  fondoConsolas: asset('img_fondo_consolas.png'),
  logoMantenimiento: asset('logo_mantenimiento.png'),
  logoArmadoPcs: asset('logo_armado_pcs.png'),
  logoConsolas: asset('logo_consolas.png'),
  logoPerifericos: asset('logo_perifericos.png'),
  envioGratis: asset('logo_envio_gratis.png'),
  soporteTecnico: asset('logo_soporte_tecnico.png'),
  garantia: asset('logo_garantia.png'),
  pagoSeguro: asset('logo_pago_seguro.png'),
};
