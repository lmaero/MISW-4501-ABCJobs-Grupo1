# Objetivos de Negocio

<table>
<thead>
  <tr>
    <th colspan="2">Objetivo de negocio #1</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Descripción</td>
    <td>Aumentar la presencia de ABC Jobs en más países</td>
  </tr>
  <tr>
    <td>Tiempo de cumplimiento</td>
    <td>En los próximos 5 años</td>
  </tr>
  <tr>
    <td>Mejora esperada del negocio</td>
    <td>Aumento de la presencia global, puesto que actualmente tienen clientes de 8 países (principalmente de USA y Europa)</td>
  </tr>
  <tr>
    <td>Cómo puede afectar la arquitectura</td>
    <td>
        <ul>
            <li>Existirá un mayor número de usuarios en simultáneo, por lo tanto, el sistema debe ser adaptable a situaciones de alta demanda.</li>
            <li>Las locaciones geográficas aumentarán la dificultad de despliegue. Además, el rendimiento de la solución puede disminuir si se introduce latencia por la locación.</li>
            <li>Las regulaciones legales respecto del manejo de información pueden variar en cada país o zona geográfica, estas deben ser tenidas en cuenta. El atributo de seguridad puede verse afectado debido a los estándares y/o regulaciones de seguridad locales</li>
        </ul>
    </td>
  </tr>
</tbody>
</table>

<hr />

<table>
<thead>
  <tr>
    <th colspan="2">Objetivo de negocio #2</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Descripción</td>
    <td>Convertirse en uno de los 5 proveedores de recursos más importantes en Latinoamérica</td>
  </tr>
  <tr>
    <td>Tiempo de cumplimiento</td>
    <td>En los próximos 5 años</td>
  </tr>
  <tr>
    <td>Mejora esperada del negocio</td>
    <td>Aumento de la reputación de ABC Jobs</td>
  </tr>
  <tr>
    <td>Cómo puede afectar la arquitectura</td>
    <td>
        <ul>
            <li>Apuntar a un mercado hasta el momento desconocido puede afectar la usabilidad, esto debido a que los usuarios pueden esperar interactuar de una manera distinta</li>
            <li>Si bien en Latinoamérica se habla principalmente español, se deben tener en cuenta países como Brasil en donde su lengua nativa es el portugués. La solución debe considerar factores como la internacionalización.</li>
            <li>La selección del proveedor de nube está atada a la disponibilidad del servicio en la región.</li>
        </ul>
    </td>
  </tr>
</tbody>
</table>

<hr />

<table>
<thead>
  <tr>
    <th colspan="2">Objetivo de negocio #3</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Descripción</td>
    <td>Tener una base de datos de más de 30.000 talentos tecnológicos (recursos técnicos)</td>
  </tr>
  <tr>
    <td>Tiempo de cumplimiento</td>
    <td>En los próximos 2 años</td>
  </tr>
  <tr>
    <td>Mejora esperada del negocio</td>
    <td>Aumentar la base de datos de talento técnico disponible. Actualmente, cuentan con una base de datos cercana a 1.000 profesionales.</td>
  </tr>
  <tr>
    <td>Cómo puede afectar la arquitectura</td>
    <td>
        <ul>
            <li>Pasar de 1.000 a 30.000 talentos tecnológicos requiere decisiones de arquitectura que favorezcan la escalabilidad y el rendimiento de la solución.</li>
            <li>El aumento del número de usuarios implica mejorar los mecanismos de autenticación y autorización.</li>
        </ul>
    </td>
  </tr>
</tbody>
</table>

<hr />

<table>
<thead>
  <tr>
    <th colspan="2">Objetivo de negocio #4</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Descripción</td>
    <td>Tener una base de datos de más de 500 empresas a nivel mundial</td>
  </tr>
  <tr>
    <td>Tiempo de cumplimiento</td>
    <td>En los próximos 2 años</td>
  </tr>
  <tr>
    <td>Mejora esperada del negocio</td>
    <td>Aumentar la base de datos de empresas demandantes de los servicios de ABC Jobs</td>
  </tr>
  <tr>
    <td>Cómo puede afectar la arquitectura</td>
    <td>
        <ul>
            <li>Si bien el número de empresas no es alarmante, la cantidad de proyectos gestionados dentro de la plataforma si puede aumentar exponencialmente, el acceso a estos recursos va a demandar un mayor rendimiento por parte del sistema.</li>
            <li>El sistema debe ser altamente adaptable/modificable, puesto que esas 500 empresas seguramente operan de manera distinta y van a desear funcionalidades distintas que se adapten a sus procesos.</li>
        </ul>
    </td>
  </tr>
</tbody>
</table>

# Restricciones de Negocio

<table>
<thead>
  <tr>
    <th colspan="2">Restricción de negocio #1</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Descripción</td>
    <td>El sistema debe ser fácil de modificar</td>
  </tr>
  <tr>
    <td>Usuario que expresa la restricción</td>
    <td>Directora de selección y contratación</td>
  </tr>
  <tr>
    <td>Justificación para esta restricción</td>
    <td>Quieren agregar nuevos tipos de pruebas para nuevas tecnologías o nuevas versiones de productos</td>
  </tr>
  <tr>
    <td>Cómo puede afectar la arquitectura</td>
    <td>
        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>

<hr />

<table>
<thead>
  <tr>
    <th colspan="2">Restricción de negocio #2</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Descripción</td>
    <td>El sistema debe ser fácil de modificar</td>
  </tr>
  <tr>
    <td>Usuario que expresa la restricción</td>
    <td>Directora de selección y contratación</td>
  </tr>
  <tr>
    <td>Justificación para esta restricción</td>
    <td>Quieren agregar nuevos tipos de pruebas para nuevas tecnologías o nuevas versiones de productos</td>
  </tr>
  <tr>
    <td>Cómo puede afectar la arquitectura</td>
    <td>
        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>

# Restricciones de Tecnología

<table>
<thead>
  <tr>
    <th colspan="2">Restricción de tecnología #1</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Descripción</td>
    <td>Todos los componentes de la plataforma debe estar desplegados en la nube</td>
  </tr>
  <tr>
    <td>Usuario que expresa la restricción</td>
    <td>Departamento de tecnología e infraestructura</td>
  </tr>
  <tr>
    <td>Justificación para esta restricción</td>
    <td>La plataforma debe estar disponible a nivel mundial</td>
  </tr>
  <tr>
    <td>Cómo puede afectar la arquitectura</td>
    <td>
        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>

<hr />

<table>
<thead>
  <tr>
    <th colspan="2">Restricción de tecnología #2</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Descripción</td>
    <td>El equipo de trabajo debe estar conformado por máximo 4 talentos en tecnología</td>
  </tr>
  <tr>
    <td>Usuario que expresa la restricción</td>
    <td>Departamento de tecnología e infraestructura</td>
  </tr>
  <tr>
    <td>Justificación para esta restricción</td>
    <td>Decisión basada en el presupuesto disponible de ABC Jobs</td>
  </tr>
  <tr>
    <td>Cómo puede afectar la arquitectura</td>
    <td>
        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>


<hr />

<table>
<thead>
  <tr>
    <th colspan="2">Restricción de tecnología #3</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Descripción</td>
    <td>Se debe contar con una plataforma web y una aplicación móvil</td>
  </tr>
  <tr>
    <td>Usuario que expresa la restricción</td>
    <td>Departamento de tecnología e infraestructura</td>
  </tr>
  <tr>
    <td>Justificación para esta restricción</td>
    <td>Establecido dentro de las necesidades contractuales</td>
  </tr>
  <tr>
    <td>Cómo puede afectar la arquitectura</td>
    <td>
        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>

# Requisitos de Calidad

## Identificación Atributos

## Especificación de Escenarios

<table>
<thead>
  <tr>
    <th>ID</th>
    <th>#001</th>
    <th>Versión</th>
    <th>V.1</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Fuente</td>
    <td>Estímulo</td>
    <td>Artefacto</td>
    <td>Ambiente</td>
  </tr>
  <tr>
    <td>Departamento de recursos humanos</td>
    <td>El aspirante envía la respuesta a una pregunta de la prueba técnica o psicológica</td>
    <td>Sistema de gestión del aspirante</td>
    <td>Operación normal</td>
  </tr>
  <tr>
    <td colspan="2">Respuesta</td>
    <td colspan="2">Medida de la respuesta</td>
  </tr>
  <tr>
    <td colspan="2">El nivel de adaptación es ajustado y se calcula la siguiente pregunta con base en el nuevo nivel de adaptación</td>
    <td colspan="2">En menos de 0.5 segundos</td>
  </tr>
</tbody>
</table>

<hr />

<table>
<thead>
  <tr>
    <th>ID</th>
    <th>#002</th>
    <th>Versión</th>
    <th>V.1</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Fuente</td>
    <td>Estímulo</td>
    <td>Artefacto</td>
    <td>Ambiente</td>
  </tr>
  <tr>
    <td>Departamento de recursos humanos</td>
    <td>El aspirante envía la respuesta a una pregunta</td>
    <td>Sistema de gestión del aspirante</td>
    <td>Operación normal</td>
  </tr>
  <tr>
    <td colspan="2">Respuesta</td>
    <td colspan="2">Medida de la respuesta</td>
  </tr>
  <tr>
    <td colspan="2">La pregunta es evaluada y su resultado debe ser reportado</td>
    <td colspan="2">En menos de 0.3 segundos</td>
  </tr>
</tbody>
</table>

<hr />

<table>
<thead>
  <tr>
    <th>ID</th>
    <th>#003</th>
    <th>Versión</th>
    <th>V.1</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Fuente</td>
    <td>Estímulo</td>
    <td>Artefacto</td>
    <td>Ambiente</td>
  </tr>
  <tr>
    <td>Departamento de recursos humanos</td>
    <td>El aspirante ingresa al sistema para realizar una prueba</td>
    <td>Sistema de gestión del aspirante</td>
    <td>Operación normal</td>
  </tr>
  <tr>
    <td colspan="2">Respuesta</td>
    <td colspan="2">Medida de la respuesta</td>
  </tr>
  <tr>
    <td colspan="2">El portal de pruebas accesible</td>
    <td colspan="2">Mínimo 30 usuarios concurrentes</td>
  </tr>
</tbody>
</table>

<hr />

<table>
<thead>
  <tr>
    <th>ID</th>
    <th>#004</th>
    <th>Versión</th>
    <th>V.1</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Fuente</td>
    <td>Estímulo</td>
    <td>Artefacto</td>
    <td>Ambiente</td>
  </tr>
  <tr>
    <td>Departamento de recursos humanos</td>
    <td>El aspirante ingresa al sistema para realizar una prueba</td>
    <td>Sistema de gestión del aspirante</td>
    <td>Operación con alto tráfico</td>
  </tr>
  <tr>
    <td colspan="2">Respuesta</td>
    <td colspan="2">Medida de la respuesta</td>
  </tr>
  <tr>
    <td colspan="2">El portal de pruebas accesible</td>
    <td colspan="2">Hasta 100 usuarios concurrentes</td>
  </tr>
</tbody>
</table>

<hr />

<table>
<thead>
  <tr>
    <th>ID</th>
    <th>#005</th>
    <th>Versión</th>
    <th>V.1</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Fuente</td>
    <td>Estímulo</td>
    <td>Artefacto</td>
    <td>Ambiente</td>
  </tr>
  <tr>
    <td>Departamento de recursos humanos</td>
    <td>Un aspirante ingresa desde cualquier parte del mundo</td>
    <td>Sistema de gestión del aspirante</td>
    <td>Operación normal</td>
  </tr>
  <tr>
    <td colspan="2">Respuesta</td>
    <td colspan="2">Medida de la respuesta</td>
  </tr>
  <tr>
    <td colspan="2">El portal de pruebas accesible</td>
    <td colspan="2">Disponibilidad de 7x24x365</td>
  </tr>
</tbody>
</table>

<hr />

<table>
<thead>
  <tr>
    <th>ID</th>
    <th>#006</th>
    <th>Versión</th>
    <th>V.1</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Fuente</td>
    <td>Estímulo</td>
    <td>Artefacto</td>
    <td>Ambiente</td>
  </tr>
  <tr>
    <td>Departamento de recursos humanos</td>
    <td>El aspirante intenta configurar la herramienta de pruebas en su idioma de preferencia</td>
    <td>Sistema de gestión del aspirante</td>
    <td>Operación normal</td>
  </tr>
  <tr>
    <td colspan="2">Respuesta</td>
    <td colspan="2">Medida de la respuesta</td>
  </tr>
  <tr>
    <td colspan="2">La herramienta configurada en el idioma seleccionado</td>
    <td colspan="2">Interfaz de usuario en el nuevo idioma seleccionado</td>
  </tr>
</tbody>
</table>


<hr />

<table>
<thead>
  <tr>
    <th>ID</th>
    <th>#006</th>
    <th>Versión</th>
    <th>V.1</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Fuente</td>
    <td>Estímulo</td>
    <td>Artefacto</td>
    <td>Ambiente</td>
  </tr>
  <tr>
    <td>Departamento de recursos humanos</td>
    <td>El aspirante intenta configurar la herramienta de pruebas en su idioma de preferencia</td>
    <td>Sistema de gestión del aspirante</td>
    <td>Operación normal</td>
  </tr>
  <tr>
    <td colspan="2">Respuesta</td>
    <td colspan="2">Medida de la respuesta</td>
  </tr>
  <tr>
    <td colspan="2">La herramienta configurada en el idioma seleccionado</td>
    <td colspan="2">Interfaz de usuario en el nuevo idioma seleccionado</td>
  </tr>
</tbody>
</table>

## Requisitos de calidad con prioridad

### Identificados

- first level
    - second level
        - third level
        - third level
        - third level
    - second level
        - third level
        - third level
        - third level
    - second level
        - third level
        - third level
        - third level

### Priorizados

- one
- one
- one
- one
- one
- one
