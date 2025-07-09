// Type definitions for leaflet-polylinedecorator

declare module 'leaflet-polylinedecorator' {
  import * as L from 'leaflet';

  namespace L {
    interface PolylineDecoratorOptions {
      patterns: Pattern[];
    }

    interface Pattern {
      offset?: string | number;
      endOffset?: string | number;
      repeat?: string | number;
      symbol: Symbol;
    }

    namespace Symbol {
      interface SymbolOptions {
        pixelSize?: number;
        polygon?: boolean;
        pathOptions?: L.PathOptions;
      }

      function arrowHead(options?: SymbolOptions): Symbol;
      function dash(options?: SymbolOptions): Symbol;
      function marker(options?: SymbolOptions): Symbol;
    }

    function polylineDecorator(polyline: L.Polyline | L.LatLngExpression[], options?: PolylineDecoratorOptions): L.PolylineDecorator;

    class PolylineDecorator extends L.Layer {
      constructor(polyline: L.Polyline | L.LatLngExpression[], options?: PolylineDecoratorOptions);
      setPatterns(patterns: Pattern[]): this;
      setPaths(polylines: L.Polyline | L.LatLngExpression[]): this;
    }
  }
}