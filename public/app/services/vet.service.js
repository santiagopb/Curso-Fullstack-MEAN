'use strict';

angular.module('vetService', ['rx'])
    .service('vetService', function($resource, $q) {
        var Resource = $resource('/api/vets/:id', { id: '@id' }, {
            query: {
                method: "GET",
                isArray: true,
                cache: true
            },
            update: {
                method: 'PUT'
            }
        })
    
        var vetSource = new Rx.BehaviorSubject(Resource.query());
        var vetList = vetSource.asObservable();

        this.query = function() {
            return vetList;
        }
        
        this.get = function (id) {
            if (vetList.source.value.find((obj) => obj._id == id)) {
                return vetList.source.value.find((obj) => obj._id == id);
            } else {
                return Resource.get({id:id});
            }
        }

        this.save = function (vet) {
            var d = $q.defer();
            if (vet._id) { // PUT
                Resource.update({ id: vet._id }, {
                    name: vet.name,
                    __v: vet.__v
                }, (data) => {
                    d.resolve (data);
                }, (err) => {
                    d.reject(err);
                });
            } else { // SAVE
                Resource.save({}, {
                    name: vet.name
                }, (data) => {
                    d.resolve (data);
                },(err) => {
                    d.reject(err);
                });
            }
            return d.promise;
        }

        this.delete = function (vet) {
            var d = $q.defer();
            Resource.delete({ id: vet._id }, (data) => {
                d.resolve(data);
            }, (err) => {
                d.reject(err);
            });
            return d.promise;
        }


        /************************************************
         * SOCKET IO
         ***********************************************/
        this.socketPost = (vet) => {
            vetList.source.value.unshift(vet);
            vetSource.onNext(vetList.source.value)
        }
        this.socketPut = (vet) => {
            const ObjIndex = vetList.source.value.findIndex((obj) => obj._id == vet._id);
            vetList.source.value[ObjIndex].name = vet.name;
            vetList.source.value[ObjIndex].__v = vet.__v;
            vetSource.onNext(vetList.source.value);
        }
        this.socketDelete = (id) => {
            const ObjIndex = vetList.source.value.findIndex((obj) => obj._id == id);
            vetList.source.value.splice(ObjIndex, 1);
            vetSource.onNext(vetList.source.value);
        }



    });