
/* =============================================
   ARCHIVO: angular-contacto.js
   Panel de estadísticas y búsqueda con AngularJS.
   Se actualiza en tiempo real cuando se eliminan
   o agregan mensajes desde contacto.js
============================================= */

var app = angular.module('contactoApp', []);

app.controller('MensajesCtrl', ['$scope', '$interval', function ($scope, $interval) {

    var KEY_STORAGE = 'mensajes_contacto_udb';

    // =============================================
    // FUNCIÓN: cargarMensajes
    // Lee los mensajes desde localStorage
    // =============================================
    function cargarMensajes() {
        var datos = localStorage.getItem(KEY_STORAGE);
        $scope.mensajes = datos ? JSON.parse(datos) : [];
    }

    // =============================================
    // PROPIEDADES del scope
    // =============================================
    $scope.textoBusqueda = '';
    $scope.ordenActual   = '-fecha';
    $scope.mensajes      = [];

    // =============================================
    // ESTADÍSTICAS
    // =============================================
    $scope.totalMensajes = function () {
        return $scope.mensajes.length;
    };

    $scope.paisesUnicos = function () {
        if ($scope.mensajes.length === 0) return 0;
        var paises = $scope.mensajes.map(function (m) {
            return m.pais ? m.pais.toLowerCase().trim() : '';
        });
        return new Set(paises).size;
    };

    $scope.ultimoMensaje = function () {
        if ($scope.mensajes.length === 0) return 'Ninguno';
        return $scope.mensajes[$scope.mensajes.length - 1].nombre;
    };

    // =============================================
    // FUNCIÓN: cambiarOrden
    // =============================================
    $scope.cambiarOrden = function (campo) {
        $scope.ordenActual = ($scope.ordenActual === campo) ? '-' + campo : campo;
    };

    // =============================================
    // FUNCIÓN: limpiarBusqueda
    // =============================================
    $scope.limpiarBusqueda = function () {
        $scope.textoBusqueda = '';
    };

    // =============================================
    // POLLING: revisa localStorage cada 500ms
    // Así detecta cambios de contacto.js en tiempo real
    // sin necesidad de recargar la página
    // =============================================
    $interval(function () {
        var datos = localStorage.getItem(KEY_STORAGE);
        var nuevos = datos ? JSON.parse(datos) : [];

        // Solo actualiza si hay diferencia
        if (JSON.stringify(nuevos) !== JSON.stringify($scope.mensajes)) {
            $scope.mensajes = nuevos;
        }
    }, 500);

    // Carga inicial
    cargarMensajes();

}]);