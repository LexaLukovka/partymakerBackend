const Route = use('Route')
const SUD = new Map([[['store', 'update', 'destroy'], ['auth']]])

/**
 *
 * Label routes
 *`
 * */

Route.resource('labels', 'LabelController')
  .validator([['labels.store', 'Label/Store'], ['labels.update', 'Label/Update']])
  .middleware(SUD)
  .apiOnly()

