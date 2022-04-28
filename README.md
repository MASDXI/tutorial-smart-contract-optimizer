# Tutorial Smart Contract Optimizer

## disclaimer

this is used only for research only not for the production
and so sorry if my code suck.

`1_MyToken20.sol` is compile without eanble optimizer  
`2_MyToken20.sol` is compile enable optimizer `200` runs (default)  
`3_MyToken20.sol` is compile eanble optimizer `50000` runs  
`4_MyToken20.sol` is compile eanble optimizer `1000000` runs  
`5_MyToken20.sol` is compile eanble optimizer `788` runs (coursed tune)  
`6_MyToken20.sol` is compile eanble optimizer `684` runs (fine tune)  

Set up project:

```bash
yarn install
```

Commands:

```bash
yarn clean              #Clear cache.
yarn compile            #Compile smart-contract.
yarn contract-size      #Show smart-contract sizing
yarn test               #Summary test and benchmark.
yarn rpc                #Run hardhat node.
```
