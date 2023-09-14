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
    <td>El sistema debe ser adaptable a las regulaciones locales</td>
  </tr>
  <tr>
    <td>Usuario que expresa la restricción</td>
    <td>Directora contratación</td>
  </tr>
  <tr>
    <td>Justificación para esta restricción</td>
    <td>La expansión de la ABCJobs implica el correcto manejo de múltiples monedas, tasas de cambio, idiomas, regulaciones laborales y contractuales.</td>
  </tr>
  <tr>
    <td>Cómo puede afectar la arquitectura</td>
    <td>
        <ul>
            <li>La internacionalización de la plataforma presupone crear la respectiva lógica de esta componente, así como sus respectivos archivos de idioma</li>
            <li>El manejo de distintas monedas podría implicar la interoperabilidad con una API de un tercero que ya cuente con las funcionalidades solicitadas</li>
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
    <td>El nuevo software de ABC Jobs debe ser capaz de integrarse con los sistemas y plataformas tecnológicas actuales sin causar interrupciones en los servicios existentes</td>
  </tr>
  <tr>
    <td>Usuario que expresa la restricción</td>
    <td>Líder del Departamento de TI de ABC Jobs</td>
  </tr>
  <tr>
    <td>Justificación para esta restricción</td>
    <td>ABC Jobs ya ha realizado inversiones significativas en sus sistemas y tecnologías actuales por lo rediseñar o reemplazar estos sistemas conlleva un costo adicional significativo y puede interrumpir las operaciones diarias. Además, los datos existentes en estos sistemas son esenciales para las operaciones de la empresa.</td>
  </tr>
  <tr>
    <td>Cómo puede afectar la arquitectura</td>
    <td>
        <ul>
            <li>Esta restricción puede dictar la adopción de patrones de diseño específicos o tecnologías que favorezcan la integración. </li>
          <li> La arquitectura puede necesitar interfaces bien definidas y puntos de integración. Además, puede ser necesario adoptar estándares de comunicación o protocolos específicos para garantizar la compatibilidad con los sistemas existentes. </li>
        </ul>
    </td>
  </tr>
</tbody>
</table>

<hr />

<table>
<thead>
  <tr>
    <th colspan="2">Restricción de negocio #3</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Descripción</td>
    <td>El sistema debe integrar la información del sistema de búsqueda y selección de candidatos, el sistema contable, y el sistema contractual</td>
  </tr>
  <tr>
    <td>Usuario que expresa la restricción</td>
    <td>Director General ABCJobs</td>
  </tr>
  <tr>
    <td>Justificación para esta restricción</td>
    <td>Actualmente, ABCJobs opera con tres aplicaciones distintas y la interoperabilidad entre estos es nula, por lo tanto, es propenso a errores humanos</td>
  </tr>
  <tr>
    <td>Cómo puede afectar la arquitectura</td>
    <td>
        <ul>
            <li>La interoperabilidad entre los 3 sistemas debe ser tratada como ciudadano de primer mundo, de lo contrario se podría crear una solución similar que no cumpla con las expectativas de ABCJobs</li>
            <li>Tres sistemas harán consultas y mutaciones de información, por lo tanto, la escalabilidad y el rendimiento de la solución deben ser tenidas en cuenta</li>
        </ul>
    </td>
  </tr>
</tbody>
</table>

<table>
<thead>
  <tr>
    <th colspan="2">Restricción de negocio #4</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Descripción</td>
    <td>El sistema ABC Jobs debe completarse dentro de un plazo específico, determinado por 3 Sprints en 8 semanas.</td>
  </tr>
  <tr>
    <td>Usuario que expresa la restricción</td>
    <td>Director del Proyecto</td>
  </tr>
  <tr>
    <td>Justificación para esta restricción</td>
    <td>ABC Jobs tiene objetivos y fechas claros que deben cumplirse para mantener su posición en el mercado y satisfacer las expectativas de los stakeholders. Retrasos en el desarrollo pueden incurrir en costos adicionales y oportunidades de mercado perdidas.</td>
  </tr>
  <tr>
    <td>Cómo puede afectar la arquitectura</td>
    <td>
        <ul>
            <li>El tiempo limitado puede llevar a decisiones arquitectónicas que prioricen la velocidad de desarrollo sobre otros factores, como la optimización del rendimiento o la flexibilidad a largo plazo.</li>
            <li> Puede ser necesario adoptar frameworks o herramientas que aceleren el desarrollo, incluso si no son ideales en otros contextos.</li>
            <li> La arquitectura puede evolucionar de manera iterativa, incorporando características esenciales primero y dejando características secundarias o mejoras para fases posteriores.</li>
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
    <td>Director de tecnología e infraestructura</td>
  </tr>
  <tr>
    <td>Justificación para esta restricción</td>
    <td>La plataforma debe estar disponible a nivel mundial</td>
  </tr>
  <tr>
    <td>Cómo puede afectar la arquitectura</td>
    <td>
        <ul>
            <li>La selección de la empresa proveedora de servicios en la nube está anclada a la disponibilidad que esta tenga en las regiones de interés de expansión para ABCJobs</li>
            <li>Las tecnologías seleccionadas deben ser compatibles con la plataforma en la nube seleccionada</li>
            <li>El esfuerzo de despliegue debe ser tenido en cuenta</li>
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
            <li>La creación de una plataforma de escala global presupone un reto para un equipo tan pequeño, dada la cantidad de tareas a realizar</li>
            <li>La alta variabilidad de las tecnologías a utilizar implica una selección correcta del equipo de desarrollo, puesto que esto afectará indirectamente la mantenibilidad del código generado</li>
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
            <li>El desarrollo de dos aplicaciones que se integren adecuadamente puede afectar la interoperabilidad, además de afectar el rendimiento del equipo al tener que dividir tareas de dos aplicaciones distintas</li>
            <li>La facilidad de modificación de la plataforma depende directamente del código generado para cada una de las plataformas</li>
            <li>La facilidad de probar el sistema, y la creación de las respectivas pruebas supone una mayor demanda de tiempo y conocimiento de distintas tecnologías, nuevamente afectando la facilidad de modificación</li>
        </ul>
    </td>
  </tr>
</tbody>
</table>

# Requisitos de Calidad

## Identificación Atributos

## Especificación de Escenarios

### 001
<table>
<thead>
  <tr>
    <th>ID</th>
    <th>LATENCY #001</th>
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

### 002
<table>
<thead>
  <tr>
    <th>ID</th>
    <th>LATENCY #002</th>
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

### 003
<table>
<thead>
  <tr>
    <th>ID</th>
    <th>SCALABILITY #003</th>
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
    <td>El aspirante ingresa al sistema para realizar y enviar una prueba</td>
    <td>Sistema de gestión del aspirante</td>
    <td>Operación normal</td>
  </tr>
  <tr>
    <td colspan="2">Respuesta</td>
    <td colspan="2">Medida de la respuesta</td>
  </tr>
  <tr>
    <td colspan="2">El portal de pruebas accesible</td>
    <td colspan="2">Mínimo 30 usuarios</td>
  </tr>
</tbody>
</table>

<hr />

### 004
<table>
<thead>
  <tr>
    <th>ID</th>
    <th>SCALABILITY #004</th>
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
    <td>El aspirante ingresa al sistema para realizar y enviar una prueba</td>
    <td>Sistema de gestión del aspirante</td>
    <td>Operación con alto tráfico</td>
  </tr>
  <tr>
    <td colspan="2">Respuesta</td>
    <td colspan="2">Medida de la respuesta</td>
  </tr>
  <tr>
    <td colspan="2">El portal de pruebas accesible</td>
    <td colspan="2">Hasta 100 usuarios</td>
  </tr>
</tbody>
</table>

<hr />

### 005
<table>
<thead>
  <tr>
    <th>ID</th>
    <th>AVAILABILITY #005</th>
    <th>Versión</th>
    <th>V.3</th>
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
    <td colspan="2">El portal de pruebas se encuentra en línea, es accesible y funcional con todas las características ofrecidas en cualquier momento</td>
    <td colspan="2">El componente de monitoreo (healthcheck) debe detectar y notificar en caso de falla en menos de 5000ms</td>
  </tr>
</tbody>
</table>

<hr />

### 006
<table>
<thead>
  <tr>
    <th>ID</th>
    <th>MAINTANABILITY #006</th>
    <th>Versión</th>
    <th>V.3</th>
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
    <td>Usuario administrador</td>
    <td>El administrador desea agregar un nuevo tipo de prueba al sistema</td>
    <td>Sistema de pruebas</td>
    <td>Durante operaciones normales, con acceso administrativo</td>
  </tr>
  <tr>
    <td colspan="2">Respuesta</td>
    <td colspan="2">Medida de la respuesta</td>
  </tr>
  <tr>
    <td colspan="2">El sistema permite al usuario administrador agregar el nuevo tipo de prueba modificando el lenguaje de programación a utilizar mediante una variable de entorno y reiniciando la aplicación. La prueba debe quedar disponible para ser utilizada en el sistema.</td>
    <td colspan="2">En menos de 1 hora</td>
  </tr>
</tbody>
</table>

<hr />

### 007
<table>
<thead>
  <tr>
    <th>ID</th>
    <th>LATENCY #007</th>
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
    <td>Aspirante</td>
    <td>Un aspirante envía las respuestas de una prueba</td>
    <td>Sistema de gestión del aspirante</td>
    <td>Operación normal</td>
  </tr>
  <tr>
    <td colspan="2">Respuesta</td>
    <td colspan="2">Medida de la respuesta</td>
  </tr>
  <tr>
    <td colspan="2">El sistema registra las respuestas de la prueba presentada por el aspirante</td>
    <td colspan="2">En menos de 500ms</td>
  </tr>
</tbody>
</table>

<hr />

### 008
<table>
<thead>
  <tr>
    <th>ID</th>
    <th>SECURITY #008</th>
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
    <td>Atacante</td>
    <td>Un atacante intenta acceder a información de los aspirantes</td>
    <td>Sistema de gestión del aspirante</td>
    <td>Operación normal</td>
  </tr>
  <tr>
    <td colspan="2">Respuesta</td>
    <td colspan="2">Medida de la respuesta</td>
  </tr>
  <tr>
    <td colspan="2">El sistema identifica y bloquea el intento de acceso no autorizado. Devuelve un 401 al cliente.</td>
    <td colspan="2">100% de datos protegidos / total de intentos de acceso</td>
  </tr>
</tbody>
</table>

<hr />

### 009
<table>
<thead>
  <tr>
    <th>ID</th>
    <th>SECURITY #009</th>
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
    <td>Empleado de ABC Jobs</td>
    <td>Intenta alterar el resultado de una prueba presentada por un aspirante</td>
    <td>Sistema de gestión del aspirante</td>
    <td>Operación normal</td>
  </tr>
  <tr>
    <td colspan="2">Respuesta</td>
    <td colspan="2">Medida de la respuesta</td>
  </tr>
  <tr>
    <td colspan="2">El resultado de la prueba permanece sin cambios.</td>
    <td colspan="2">100% de datos conservados / total de intentos de acceso</td>
  </tr>
</tbody>
</table>

<hr />

### 010
<table>
<thead>
  <tr>
    <th>ID</th>
    <th>SCALABILITY #010</th>
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
    <td>Aspirantes</td>
    <td>Enviar una prueba técnica o psicológica finalizada</td>
    <td>Sistema de gestión del aspirante</td>
    <td>Operación normal</td>
  </tr>
  <tr>
    <td colspan="2">Respuesta</td>
    <td colspan="2">Medida de la respuesta</td>
  </tr>
  <tr>
    <td colspan="2">Las respuestas son procesadas y guardadas correctamente</td>
    <td colspan="2">De 15 a 30 solicitudes por segundo hasta por 60 minutos.</td>
  </tr>
</tbody>
</table>

<hr />

### 011
<table>
<thead>
  <tr>
    <th>ID</th>
    <th>SCALABILITY #011</th>
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
    <td>Aspirantes</td>
    <td>Enviar una prueba técnica o psicológica finalizada</td>
    <td>Sistema de gestión del aspirante</td>
    <td>Operación normal</td>
  </tr>
  <tr>
    <td colspan="2">Respuesta</td>
    <td colspan="2">Medida de la respuesta</td>
  </tr>
  <tr>
    <td colspan="2">Las respuestas son procesadas y guardadas correctamente</td>
    <td colspan="2">30 pruebas guardadas/minuto</td>
  </tr>
</tbody>
</table>

<hr />

### 012
<table>
<thead>
  <tr>
    <th>ID</th>
    <th>AVAILABILITY #012</th>
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
    <td colspan="2">El portal de registro del aspirante se encuentra en línea, es accesible y funcional con todas las características ofrecidas en cualquier momento</td>
    <td colspan="2">El componente de monitoreo (healthcheck) debe detectar y notificar en caso de falla en menos de 5000ms</td>
  </tr>
</tbody>
</table>

<hr />

### 013
<table>
<thead>
  <tr>
    <th>ID</th>
    <th>SECURITY #013</th>
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
    <td>Una empresa</td>
    <td>Intenta acceder a información de un proyecto de otra empresa</td>
    <td>Sistema de gestión de empresas</td>
    <td>Operación normal</td>
  </tr>
  <tr>
    <td colspan="2">Respuesta</td>
    <td colspan="2">Medida de la respuesta</td>
  </tr>
  <tr>
    <td colspan="2">El sistema identifica y bloquea el intento de acceso no autorizado. Devuelve un 403 al cliente.</td>
    <td colspan="2">100% de datos protegidos / total de intentos de acceso</td>
  </tr>
</tbody>
</table>

<hr />

### 014
<table>
<thead>
  <tr>
    <th>ID</th>
    <th>SECURITY #014</th>
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
    <td>Empleado de ABC Jobs</td>
    <td>Intenta alterar el precio de una oferta publicada por una empresa</td>
    <td>Sistema de gestión de empresas</td>
    <td>Operación normal</td>
  </tr>
  <tr>
    <td colspan="2">Respuesta</td>
    <td colspan="2">Medida de la respuesta</td>
  </tr>
  <tr>
    <td colspan="2">El precio de la oferta publicada permanece sin cambios.</td>
    <td colspan="2">100% de datos conservados / total de intentos de acceso</td>
  </tr>
</tbody>
</table>

<hr />

### 015
<table>
<thead>
  <tr>
    <th>ID</th>
    <th>MAINTANABILITY #015</th>
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
    <td>Usuario administrador</td>
    <td>El administrador desea agregar una etiqueta a cada campo de formulario que indique claramente si es requerido o no</td>
    <td>Aplicación Frontend Web</td>
    <td>Durante operaciones normales</td>
  </tr>
  <tr>
    <td colspan="2">Respuesta</td>
    <td colspan="2">Medida de la respuesta</td>
  </tr>
  <tr>
    <td colspan="2">Todos los campos de los formularios de creación de aspirates, empresas, proyectos, entrevistas, etc., incluyen un indicador de si el campo es requerido o no</td>
    <td colspan="2">En menos de 12 horas</td>
  </tr>
</tbody>
</table>

## Requisitos de calidad con prioridad

### Identificados

- Requisitos
    - Latencia
        - #001
        - #002
        - #003
        - #004
        - #007
    - Disponibilidad
        - #005
        - #012
    - Facilidad de modificación
        - #006
        - #015
    - Seguridad
        - #008
        - #009
        - #013
        - #014
    - Escalabilidad
        - #010
        - #011
      
### Priorizados

- #001
- #002
- #003
- #004
- #007
- #005
- #012
- #008
- #009
- #013
- #014
- #010
- #011
- #006
- #015