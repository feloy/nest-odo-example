# Sample NestJS application to use with odo

This is a sample application using the [NestJS](https://nestjs.com/) framework, and instructions on how to develop the application using [odo](https://github.com/openshift/odo).

The application is an API which, when calls, connects to a PostgreSQL database to make some simple computation and displays the response.

## Pre-requisites on OpenShift
- Install EDB Cloud Native PostgreSQL operator for all projects or for the current project.

## Inner loop

```
$ odo project create prj1
```

Check that the EDB Cloud native PostgreSQL operator is available:
```
$ odo catalog list services
Services available through Operators
NAME                                CRDs
cloud-native-postgresql.v1.6.0      Backup, Cluster, ScheduledBackup
service-binding-operator.v0.8.0     ServiceBinding
```

Create a nodejs component using the sources in the current directory:

```
$ odo create nodejs api
```

Create an instance of the PostgreSQL service:

```
$ odo service create cloud-native-postgresql.v1.6.0/Cluster pg
$ odo push
```

Link the PostgreSQL service to the component:

```
$ odo link Cluster/pg
$ odo push
```

Call the API:

```
$ odo describe
Component Name: api
Type: nodejs
Environment Variables:
 · PROJECTS_ROOT=/project
 · PROJECT_SOURCE=/project
 · DEBUG_PORT=5858
URLs:
 · http://http-3000-app-prj1.apps-crc.testing exposed via 3000
Linked Services:
 · Cluster/pg
   Environment Variables:
    · CLUSTER_PGPASS
    · CLUSTER_TLS.CRT
    · CLUSTER_TLS.KEY
    · CLUSTER_USERNAME
    · CLUSTER_CA.CRT
    · CLUSTER_CA.KEY
    · CLUSTER_CLUSTERIP
    · CLUSTER_PASSWORD
$ curl http://http-3000-app-prj1.apps-crc.testing
=> 2
```

Debug configuration for vscode:

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Attach to remote 5858",
            "type": "node",
            "request": "attach",
            "address": "localhost",
            "port": 5858,
            "localRoot": "${workspaceFolder}",
            "remoteRoot": "/project"
        }
    ]
}
```
