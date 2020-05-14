mockModules()
import Dispatcher, { ENVIRONMENT } from ".";
import MasterBrowser from "./Browser/MasterBrowser";
import ChildProcess from "./Browser/ChildBrowser";

function mockModules() {
  jest.mock("./Browser/MasterBrowser", () => (function() {}));
  jest.mock("./Browser/ChildBrowser", () => (function() {}));
}

const getEnvironmentMock = jest.spyOn(
  Dispatcher.prototype as any,
  "getEnvironment"
);

describe('Background', function() {
  describe("#getMaster", function () {
    describe("Browser", function () {
      it("Should instantiate master inside browser", function () {
        getEnvironmentMock.mockImplementationOnce((_) => ENVIRONMENT.BROWSER);
        const dispatcher = new Dispatcher();
        const master = dispatcher.getMaster();
        expect(master).toBeInstanceOf(MasterBrowser);
      });
      it("Should not instantiate master outside browser", function () {
        getEnvironmentMock.mockImplementationOnce((_) => ENVIRONMENT.UNKNOWN);
        const dispatcher = new Dispatcher();
        expect(() => dispatcher.getMaster()).toThrowError(
          "Cannot 't get an implementation for this platform"
        );
      });
    });
  });
  describe('#getChild', function() {
    describe("Browser", function () {
      it("Should instantiate master inside browser", function () {
        getEnvironmentMock.mockImplementationOnce((_) => ENVIRONMENT.BROWSER);
        const dispatcher = new Dispatcher();
        const master = dispatcher.getChild();
        expect(master).toBeInstanceOf(ChildProcess);
      });
      it("Should not instantiate master outside browser", function () {
        getEnvironmentMock.mockImplementationOnce((_) => ENVIRONMENT.UNKNOWN);
        const dispatcher = new Dispatcher();
        expect(() => dispatcher.getChild()).toThrowError(
          "Cannot 't get an implementation for this platform"
        );
      });
    });
  })
  describe("#getEnvironment", function () {
    const getEnvironmenent = getEnvironmentMock.getMockImplementation()
    it('should return correct enum inside browser', function() {
      const env = getEnvironmenent()
      expect(env).toEqual(ENVIRONMENT.BROWSER)
    })
  });
})