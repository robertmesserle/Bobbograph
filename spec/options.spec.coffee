describe 'Options', ->

  Options = get 'Options'

  it 'should work properly with only default options', ->
    options = new Options
    expect( options.width ).toBe 600
    expect( options.height ).toBe 300

  it 'should allow you to override defaults', ->
    options = new Options height: 500
    expect( options.width ).toBe 600
    expect( options.height ).toBe 500