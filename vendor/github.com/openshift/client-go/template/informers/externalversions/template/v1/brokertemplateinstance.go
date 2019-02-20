// This file was automatically generated by informer-gen

package v1

import (
	template_v1 "github.com/openshift/api/template/v1"
	versioned "github.com/openshift/client-go/template/clientset/versioned"
	internalinterfaces "github.com/openshift/client-go/template/informers/externalversions/internalinterfaces"
	v1 "github.com/openshift/client-go/template/listers/template/v1"
	meta_v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	runtime "k8s.io/apimachinery/pkg/runtime"
	watch "k8s.io/apimachinery/pkg/watch"
	cache "k8s.io/client-go/tools/cache"
	time "time"
)

// BrokerTemplateInstanceInformer provides access to a shared informer and lister for
// BrokerTemplateInstances.
type BrokerTemplateInstanceInformer interface {
	Informer() cache.SharedIndexInformer
	Lister() v1.BrokerTemplateInstanceLister
}

type brokerTemplateInstanceInformer struct {
	factory          internalinterfaces.SharedInformerFactory
	tweakListOptions internalinterfaces.TweakListOptionsFunc
}

// NewBrokerTemplateInstanceInformer constructs a new informer for BrokerTemplateInstance type.
// Always prefer using an informer factory to get a shared informer instead of getting an independent
// one. This reduces memory footprint and number of connections to the server.
func NewBrokerTemplateInstanceInformer(client versioned.Interface, resyncPeriod time.Duration, indexers cache.Indexers) cache.SharedIndexInformer {
	return NewFilteredBrokerTemplateInstanceInformer(client, resyncPeriod, indexers, nil)
}

// NewFilteredBrokerTemplateInstanceInformer constructs a new informer for BrokerTemplateInstance type.
// Always prefer using an informer factory to get a shared informer instead of getting an independent
// one. This reduces memory footprint and number of connections to the server.
func NewFilteredBrokerTemplateInstanceInformer(client versioned.Interface, resyncPeriod time.Duration, indexers cache.Indexers, tweakListOptions internalinterfaces.TweakListOptionsFunc) cache.SharedIndexInformer {
	return cache.NewSharedIndexInformer(
		&cache.ListWatch{
			ListFunc: func(options meta_v1.ListOptions) (runtime.Object, error) {
				if tweakListOptions != nil {
					tweakListOptions(&options)
				}
				return client.TemplateV1().BrokerTemplateInstances().List(options)
			},
			WatchFunc: func(options meta_v1.ListOptions) (watch.Interface, error) {
				if tweakListOptions != nil {
					tweakListOptions(&options)
				}
				return client.TemplateV1().BrokerTemplateInstances().Watch(options)
			},
		},
		&template_v1.BrokerTemplateInstance{},
		resyncPeriod,
		indexers,
	)
}

func (f *brokerTemplateInstanceInformer) defaultInformer(client versioned.Interface, resyncPeriod time.Duration) cache.SharedIndexInformer {
	return NewFilteredBrokerTemplateInstanceInformer(client, resyncPeriod, cache.Indexers{cache.NamespaceIndex: cache.MetaNamespaceIndexFunc}, f.tweakListOptions)
}

func (f *brokerTemplateInstanceInformer) Informer() cache.SharedIndexInformer {
	return f.factory.InformerFor(&template_v1.BrokerTemplateInstance{}, f.defaultInformer)
}

func (f *brokerTemplateInstanceInformer) Lister() v1.BrokerTemplateInstanceLister {
	return v1.NewBrokerTemplateInstanceLister(f.Informer().GetIndexer())
}
